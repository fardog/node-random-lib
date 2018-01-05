# random-lib Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [HEAD]
* Updates API to reduce stutter and better match Node APIs
* Removes support for Node.js versions older than 4
* Use [rejection-sampled-int][] to generate unbiased integers, replacing the
  old, biased algorithm

**Note:** the unbiased algorithm is much slower than the older, biased version.
If you were using this function in a performance-critical area of code, be sure
to test thoroughly with the new version.

## [2.1.0]
* Fix passing your own Promise constructor; this was broken in 2.0.x

## [2.0.0]
* Rewrite: new API, adds synchronous functions. Tests on Node.js 4 and 5,
  removes testling

## [1.1.3]
* Officially supports node 0.11

## [1.1.2]
* Updates dependencies and adds dependency badge

## [1.1.0]
* Only return Promises when callbacks aren't used

## [1.0.1]
* Anonymous functions are now named, internal documentation updates, new tests,
  and updated dependencies

## [1.0.0]
* The API now supports Promises

## [0.1.5]
* Tests browser support; adds [testling][] for automated tests

## [0.1.4]
* Avoids [releasing Zalgo][zalgo] on errors

## [0.1.3]
* Bug fixes

## [0.1.2]
* Adds `randomUniqueInts` and `randomUniqueFloats` for arrays with unique
  numbers

## [0.1.1]
* Remove peerDependencies

## [0.1.0]
* Initial release

[0.1.0]: https://github.com/urbanairship/node-random-lib/compare/687c951...v0.1.0
[0.1.1]: https://github.com/urbanairship/node-random-lib/compare/v0.1.0...v0.1.1
[0.1.2]: https://github.com/urbanairship/node-random-lib/compare/v0.1.1...v0.1.2
[0.1.3]: https://github.com/urbanairship/node-random-lib/compare/v0.1.2...v0.1.3
[0.1.4]: https://github.com/urbanairship/node-random-lib/compare/v0.1.3...v0.1.4
[0.1.5]: https://github.com/urbanairship/node-random-lib/compare/v0.1.4...v0.1.5
[1.0.0]: https://github.com/urbanairship/node-random-lib/compare/v0.1.5...v1.0.0
[1.0.1]: https://github.com/urbanairship/node-random-lib/compare/v1.0.0...v1.0.1
[1.1.0]: https://github.com/urbanairship/node-random-lib/compare/v1.0.0...v1.1.0
[1.1.2]: https://github.com/urbanairship/node-random-lib/compare/v1.1.0...v1.1.2
[1.1.3]: https://github.com/urbanairship/node-random-lib/compare/v1.1.2...v1.1.3
[2.0.0]: https://github.com/urbanairship/node-random-lib/compare/v1.1.3...v2.0.0
[2.1.0]: https://github.com/urbanairship/node-random-lib/compare/v2.0.0...v2.1.0
[HEAD]: https://github.com/urbanairship/node-random-lib/compare/v2.1.0...HEAD

[zalgo]: http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony
[testling]: https://ci.testling.com/
[rejection-sampled-int]: https://github.com/fardog/rejection-sampled-int
