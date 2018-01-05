var crypto = require('crypto')

var dz = require('dezalgo')
var rejectionSampledInt = require('rejection-sampled-int')

var MAX_SAFE_INT = Math.pow(2, 53) - 1
var FLOAT_ENTROPY_BYTES = 7

module.exports = {
  float: _wrap(float),
  floatSync: _wrapsync(floatSync),
  int: _wrap(int),
  intSync: _wrapsync(intSync),
  floats: _wrap(floats),
  floatsSync: _wrapsync(floatsSync),
  ints: _wrap(ints),
  intsSync: _wrapsync(intsSync),
  _maxSafeInt: MAX_SAFE_INT
}

var DEFAULT_OPTS = {
  min: 0,
  max: MAX_SAFE_INT,
  num: 10
}

function _assignDefaults (_opts, sync) {
  var opts = Object.assign({}, DEFAULT_OPTS, _opts)

  if (opts.min > opts.max) {
    throw new Error('min cannot be less than max')
  }

  if (sync && opts.unique) {
    throw new Error('cannot ask for unique values when async')
  }

  return opts
}

function _wrap (fn) {
  return wrapped

  function wrapped (_opts, _ready) {
    if (typeof _opts === 'function') {
      _ready = _opts
      _opts = {}
    }
    if (!_ready) {
      return new Promise(begin)
    }

    var ready = dz(_ready)
    var opts

    try {
      opts = _assignDefaults(_opts)
    } catch (e) {
      return ready(e)
    }

    fn(opts, ready)

    function begin (resolve, reject) {
      try {
        opts = _assignDefaults(_opts)
      } catch (e) {
        return reject(e)
      }

      fn(opts, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    }
  }
}

function _wrapsync (fn) {
  return wrapped

  function wrapped (_opts) {
    var opts = _assignDefaults(_opts, true)

    return fn(opts)
  }
}

function float (opts, ready) {
  crypto.randomBytes(FLOAT_ENTROPY_BYTES, function (err, buf) {
    if (err) {
      return ready(err)
    }

    ready(null, floatFromBuffer(buf))
  })
}

function int (opts, ready) {
  rejectionSampledInt(opts, (err, int) => {
    if (err) return ready(err)

    ready(null, int)
  })
}

function floats (opts, ready) {
  applyN(float, opts, ready)
}

function ints (opts, ready) {
  if (opts.unique && opts.max - opts.min < opts.num) {
    return ready(new Error('Not enough ints between min and max to be unique.'))
  }

  applyN(rejectionSampledInt, opts, ready)
}

function floatSync () {
  return floatFromBuffer(crypto.randomBytes(FLOAT_ENTROPY_BYTES))
}

function intSync (opts) {
  return rejectionSampledInt.sync(opts)
}

function floatsSync (opts) {
  return applyNSync(floatSync, opts.num, opts)
}

function intsSync (opts) {
  return applyNSync(rejectionSampledInt.sync, opts.num, opts)
}

/**
 * Given a buffer containing bytes of entropy, generate a double-precision
 * 64-bit float.
 *
 * @param {Buffer} buf a buffer of bytes
 * @returns {Number} a float
 */
function floatFromBuffer (buf) {
  if (buf.length < FLOAT_ENTROPY_BYTES) {
    throw new Error(
      'buffer must contain at least ' + FLOAT_ENTROPY_BYTES + ' bytes of entropy'
    )
  }
  var position = 0

  // http://stackoverflow.com/questions/15753019/floating-point-number-from-crypto-randombytes-in-javascript
  return (((((((
    buf[position++] % 32) / 32 +
    buf[position++]) / 256 +
    buf[position++]) / 256 +
    buf[position++]) / 256 +
    buf[position++]) / 256 +
    buf[position++]) / 256 +
    buf[position]) / 256
}

/**
 * Apply a function a number of times, returning an array of the results.
 *
 * @param {Function} fn the function to call on each
 * @param {Number} num the size of the array to generate
 * @param {*} args... a list of args to pass to the function fn
 * @returns {Array} the filled array
 */
function applyNSync () {
  var args = Array.prototype.slice.call(arguments)
  var fn = args.shift()
  var num = args.shift()

  var arr = []

  for (var i = 0; i < num; ++i) {
    arr.push(fn.apply(null, args))
  }

  return arr
}

/**
 * Creates an array of items, whose contents are the result of calling
 * asynchronous function fn once for each item in the array. The function is
 * called in series, until the array is filled.
 *
 * @param {Function} fn the function to be called with ({Objct} opts, ready)
 *   where `ready` must be called with (err, value)
 * @param {Object} opts the options hash that random-lib expects
 * @param {Function} ready the function to be called with (err, {Array} values)
 */
function applyN (fn, opts, ready) {
  var num = opts.num || 0
  var unique = opts.unique

  var arr = []

  fn(opts, onValue)

  function onValue (err, value) {
    if (err) {
      return ready(err)
    }

    if (!unique || arr.indexOf(value) === -1) {
      arr.push(value)
    }

    if (arr.length >= num) {
      return ready(null, arr)
    }

    process.nextTick(function () {
      fn(opts, onValue)
    })
  }
}
