# random-lib

[![Build Status](http://img.shields.io/travis/fardog/node-random-lib/master.svg?style=flat-square)](https://travis-ci.org/fardog/node-random-lib)
[![npm install](http://img.shields.io/npm/dm/random-lib.svg?style=flat-square)](https://www.npmjs.org/package/random-lib)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

A library that wraps the [Node.js][] crypto functions to create random floats
and bounded integers with ease.

> **Warning:** I am not a cryptographer, or any sort of random number expert.
  An audit would be greatly appreciated.

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

// or synchronously
var results = rand.ints(opts)
console.log(results) // [ 2, 1, 3, 8, 9, 7, 2, 4, 4, 7 ]

// or, with promises
rand.ints(opts).then(function(results) {
  console.log(results) // [ 2, 8, 4, 5, 2, 1, 7, 7, 8, 9 ]
})
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
rand.randomInts(options, function(err, results) {
  console.log(results)
})

//for floats; what's shown are the defaults.
var options = {
  num: 10,  // number of floats to receive
  unique: false  // receive only unique floats; only supported when async
}
rand.randomFloats(options, function(err, results) {
  console.log(results)
})
```

### API

When calling any function, omitting a callback will cause the function to
return a Promise.

* `ints([options], [callback (err, results)]) => number[]`  
  Get an array of random integers.
* `int([options], [callback (err, result)]) => number`  
  Convenience function to get a single random integer.
* `floats([options], [callback (err, results)]) => number[]`  
  Get an array of random floats between 0 and 1.
* `float([options], [callback (err, results)]) => number`  
  Convenience function to get a single random float between 0 and 1.

#### Synchronous Methods

Synchronous methods take the same options as their async counterparts. The
`unique` option is not supported while synchronous.

* `intsSync([options]): number[]`
* `intSync([options]): number`
* `floatsSync([options]): number[]`
* `floatSync([options]): number`

## Notes

- Using the synchronous interface calls [crypto.randomBytes][] synchronously;
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

- **v3.0.0**  
Removes support for Node.js versions older than 4. Use [rejection-sampled-int][]
to generate unbiased integers, replacing the old, biased algorithm. **Note:**
the unbiased algorithm is much slower than the older, biased version. If you
were using this function in a performance-critical area of code, be sure to test
thoroughly with the new version.

- **v2.1.0**  
Fix passing your own Promise constructor; this was broken in 2.0.x

- **v2.0.0**  
Rewrite: new API, adds synchronous functions. Tests on Node.js 4 and 5, removes
testling.

- **v1.1.3**  
Officially supports node 0.11.

- **v1.1.2**  
Updates dependencies and adds dependency badge.

- **v1.1.0**  
Only return Promises when callbacks aren't used.

- **v1.0.1**  
Anonymous functions are now named, internal documentation updates, new tests,
and updated dependencies.

- **v1.0.0**  
The API now supports Promises.

- **v0.1.5**  
Tests browser support. Adds [testling][] for automated tests.

- **v0.1.4**  
Avoids [releasing Zalgo][zalgo] on errors.

- **v0.1.3**  
Bug fixes.

- **v0.1.2**  
Adds `randomUniqueInts` and `randomUniqueFloats` for arrays with unique numbers.

- **v0.1.1**  
Remove peerDependencies.

- **v0.1.0**  
Initial release.

## License

MIT. See [LICENSE][] for details.

[crypto.randomBytes]: https://nodejs.org/dist/latest-v5.x/docs/api/crypto.html#crypto_crypto_randombytes_size_callback
[zalgo]: http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony
[LICENSE]: ./LICENSE
[testling]: https://ci.testling.com/
[Node.js]: http://nodejs.org
[rejection-sampled-int]: https://github.com/fardog/rejection-sampled-int
