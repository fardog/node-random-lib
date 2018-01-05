# random-lib

[![Build Status](http://img.shields.io/travis/fardog/node-random-lib/master.svg?style=flat-square)](https://travis-ci.org/fardog/node-random-lib)
[![npm install](http://img.shields.io/npm/dm/random-lib.svg?style=flat-square)](https://www.npmjs.org/package/random-lib)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

A library that wraps the [Node.js][] crypto functions to create random floats
and bounded integers with ease.

> **Warning:** I am not a cryptographer, or any sort of random number expert.
  An audit would be greatly appreciated.

Version 3.0 of this module brings a new API and very different performance
characteristics for integers; however it also removes bias which existed in
older versions of this module.

* [Version 3 Update Notes][v3]
* [Version 2 Docs][v2]

## Installation

To install the module for use in your projects:

```bash
npm install random-lib
```

## Usage

```js
var rand = require('random-lib')
var opts = {
  min: 1,
  max: 10,
  num: 10
}

// get 10 random integers, between 1 and 10
rand.ints(opts, function(err, results) {
  console.log(results) // [ 1, 1, 8, 9, 1, 4, 1, 6, 3, 8 ]
})

// or, with promises
rand.ints(opts).then(function(results) {
  console.log(results) // [ 2, 8, 4, 5, 2, 1, 7, 7, 8, 9 ]
})

// or synchronously
var results = rand.intsSync(opts)
console.log(results) // [ 2, 1, 3, 8, 9, 7, 2, 4, 4, 7 ]
```

Options are accepted, but are different if you're asking for floats or integers.

### Options

Options are passed via an object; what's shown below are the defaults,
and nothing is required.

```js

// for integers; what's shown are the defaults.
var options = {
  num: 10,  // number of ints to receive
  min: 0,  // minimum bound (inclusive)
  max: Number.MAX_SAFE_INT,  // maximum bound (exclusive),
  unique: false  // receive only unique ints; only supported when async
}
rand.ints(options, function(err, results) {
  console.log(results)
})

//for floats; what's shown are the defaults.
var options = {
  num: 10,  // number of floats to receive
  unique: false  // receive only unique floats; only supported when async
}
rand.floats(options, function(err, results) {
  console.log(results)
})
```

### API

When calling any function, omitting a callback will cause the function to
return a Promise.

* `ints([options], [callback (err, results)]): number[]`  
  Get an array of random integers.
* `int([options], [callback (err, result)]): number`  
  Convenience function to get a single random integer.
* `floats([options], [callback (err, results)]): number[]`  
  Get an array of random floats between 0 and 1.
* `float([options], [callback (err, results)]): number`  
  Convenience function to get a single random float between 0 and 1.

#### Synchronous Methods

Synchronous methods take the same options as their async counterparts, except
for the `unique` option which is not supported while synchronous.

* `intsSync([options]): number[]`
* `intSync([options]): number`
* `floatsSync([options]): number[]`
* `floatSync([options]): number`

## Notes

* Using the synchronous interface calls [crypto.randomBytes][] synchronously;
  please be sure to read the documentation for your Node.js version to
  understand the performance implications.

## Contributing

Feel free to send pull requests! I'm not picky, but would like the following:

1. Write tests for any new features, and do not break existing tests.
2. Follow existing code style.
3. Be sure to point out any changes that break API.
4. Do not bump package.json `version` or add new dependencies without discussing
   in an issue first.

## History

See [CHANGELOG][] for details.

## License

MIT. See [LICENSE][] for details.

[crypto.randomBytes]: https://nodejs.org/dist/latest-v6.x/docs/api/crypto.html#crypto_crypto_randombytes_size_callback
[CHANGELOG]: ./CHANGELOG.md
[LICENSE]: ./LICENSE
[Node.js]: http://nodejs.org
[v2]: https://github.com/fardog/node-random-lib/tree/v2.1.0
[v3]: https://github.com/fardog/node-random-lib/blob/master/CHANGELOG.md#300
