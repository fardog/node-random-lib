var test = require('tape')

var lib = require('./')

test('can generate random bounded int', function (t) {
  var options = {
    min: 3,
    max: 10
  }

  lib.int(options, function (err, result) {
    if (err) {
      return t.fail(err)
    }

    t.ok(result, 'should get a result')
    t.ok(typeof result === 'number', 'should be a number')
    t.false(isNaN(result), 'should not be NaN')
    t.ok(result < 10, 'should be less than 10')
    t.ok(result >= 3, 'should be greater than 3')
    t.end()
  })
})

test('sync: can generate random bounded int', function (t) {
  var options = {
    min: 3,
    max: 10
  }

  var result = lib.intSync(options)

  t.ok(result, 'should get a result')
  t.ok(typeof result === 'number', 'should be a number')
  t.false(isNaN(result), 'should not be NaN')
  t.ok(result < 10, 'should be less than 10')
  t.ok(result >= 3, 'should be greater than 3')
  t.end()
})

test('can generate many random bounded ints', function (t) {
  var options = {
    num: 1000,
    min: 3,
    max: 2000
  }

  lib.ints(options, function (err, results) {
    if (err) {
      return t.fail(err)
    }

    t.ok(Array.isArray(results), 'should get an array of results')
    t.equal(results.length, 1000, 'should get 1000 results')
    t.true(results.every(function (num) {
      return num >= options.min && num < options.max
    }), 'should be correctly bounded')
    t.end()
  })
})

test('sync: can generate many random bounded ints', function (t) {
  var options = {
    num: 1000,
    min: 3,
    max: 2000
  }

  var results = lib.intsSync(options)

  t.ok(Array.isArray(results), 'should get an array of results')
  t.equal(results.length, 1000, 'should get 1000 results')
  t.true(results.every(function (num) {
    return num >= options.min && num < options.max
  }), 'should be correctly bounded')
  t.end()
})

test('can generate ints with the defaults', function (t) {
  lib.ints(function (err, results) {
    if (err) {
      return t.fail(err)
    }

    t.equal(results.length, 10, 'should get 10 results')
    t.true(results.every(function (num) {
      return num >= 0 && num < lib._maxSafeInt
    }), 'should be correctly bounded')
    t.end()
  })
})

test('sync: can generate ints with the defaults', function (t) {
  var results = lib.intsSync()

  t.equal(results.length, 10, 'should get 10 results')
  t.true(results.every(function (num) {
    return num >= 0 && num < lib._maxSafeInt
  }), 'should be correctly bounded')
  t.end()
})

test('can generate random float', function (t) {
  lib.float(function (err, result) {
    if (err) {
      return t.fail(err)
    }

    t.ok(result >= 0, 'should greater than 0')
    t.ok(result < 1, 'should be less than 1')
    t.ok(result % 1 !== 0, 'should be a float')
    t.end()
  })
})

test('sync: can generate random float', function (t) {
  var result = lib.floatSync()

  t.ok(result >= 0, 'should greater than 0')
  t.ok(result < 1, 'should be less than 1')
  t.ok(result % 1 !== 0, 'should be a float')
  t.end()
})

test('can generate random floats', function (t) {
  var opts = {
    num: 1000
  }

  lib.floats(opts, function (err, results) {
    if (err) {
      return t.fail(err)
    }

    t.ok(Array.isArray(results), 'should get an array of results')
    t.equal(results.length, 1000, 'should get 1000 results')
    t.true(results.every(function (num) {
      return num >= 0 && num < 1 && num % 1 !== 0
    }), 'should contain only floats')
    t.end()
  })
})

test('sync: can generate random floats', function (t) {
  var opts = {
    num: 1000
  }

  var results = lib.floatsSync(opts)

  t.ok(Array.isArray(results), 'should get an array of results')
  t.equal(results.length, 1000, 'should get 1000 results')
  t.true(results.every(function (num) {
    return num >= 0 && num < 1 && num % 1 !== 0
  }), 'should contain only floats')
  t.end()
})

test('can generate random unique ints', function (t) {
  var opts = {
    num: 1000,
    min: 0,
    max: 3000,
    unique: true
  }

  lib.ints(opts, function (err, results) {
    if (err) {
      return t.fail(err)
    }

    t.ok(Array.isArray(results), 'should get an array of results')
    t.equal(results.length, 1000, 'should get 1000 results')

    var seen = []

    t.true(results.every(function (num) {
      if (seen.indexOf(num) !== -1) {
        return false
      }

      return seen.push(num)
    }), 'should have unique results')

    t.end()
  })
})

test('error when asking for too many unique ints', function (t) {
  lib.ints({unique: true, min: 100, max: 199, num: 100}, function (err) {
    t.ok(err, 'should error')

    lib.ints({unique: true, min: 0, max: 10, num: 20}, function (err) {
      t.ok(err, 'should error')
      t.end()
    })
  })
})

test('sync: not allowed to generate random unique ints', function (t) {
  var opts = {
    num: 1000,
    min: 0,
    max: 3000,
    unique: true
  }

  t.throws(function () {
    lib.intsSync(opts)
  }, 'should throw when uniques are requested')

  t.end()
})

test('can generate random unique floats', function (t) {
  var opts = {
    num: 1000,
    unique: true
  }

  lib.floats(opts, function (err, results) {
    if (err) {
      return t.fail(err)
    }

    t.ok(Array.isArray(results), 'should get an array of results')
    t.equal(results.length, 1000, 'should get 1000 results')

    var seen = []

    t.true(results.every(function (num) {
      if (seen.indexOf(num) !== -1) {
        return false
      }

      return seen.push(num)
    }), 'should have unique results')

    t.end()
  })
})

test('sync: not allowed to generate random unique floats', function (t) {
  var opts = {
    num: 1000,
    unique: true
  }

  t.throws(function () {
    lib.floatsSync(opts)
  }, 'should throw when uniques are requested')

  t.end()
})

test('cannot set min above max', function (t) {
  t.plan(1)

  lib.int({min: 10, max: 0})
    .then(function () { t.fail('should not resolve') })
    .catch(function () { t.pass('should reject') })
})

test('sync: cannot set min above max', function (t) {
  t.plan(1)

  t.throws(function () {
    lib.intSync({min: 10, max: 0})
  })
})

test('promisified function, full', function (t) {
  var opts = {
    min: 3,
    max: 10
  }

  lib.int(opts).then(function (result) {
    t.ok(result, 'should get a result')
    t.ok(typeof result === 'number', 'should be a number')
    t.false(isNaN(result), 'should not be NaN')
    t.ok(result < 10, 'should be less than 10')
    t.ok(result >= 3, 'should be greater than 3')
    t.end()
  }).catch(function (err) {
    t.fail(err)
  })
})

test('promise: defaults', function (t) {
  lib.int().then(function (result) {
    t.ok(result, 'should get a result')
    t.ok(typeof result === 'number', 'should be a number')
    t.false(isNaN(result), 'should not be NaN')
    t.ok(result < lib._maxSafeInt, 'should be less than MAX_SAFE_INT')
    t.ok(result >= 0, 'should be greater than 0')
    t.end()
  }).catch(function (err) {
    t.fail(err)
  })
})
