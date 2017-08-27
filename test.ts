import * as rand from './'

let num: number
let nums: number[]

num = rand.randomInt()
num = rand.randomInt({min: 0, max: 10})
num = rand.randomInt({min: 10})
num = rand.randomInt({max: 10})
num = rand.randomFloat()

nums = rand.randomInts()
nums = rand.randomInts({min: 0, max: 10})
nums = rand.randomInts({min: 0, max: 10, num: 100})
nums = rand.randomInts({min: 10})
nums = rand.randomInts({max: 10})
nums = rand.randomFloats()
nums = rand.randomFloats({num: 100})

rand.randomInt((err: Error, int: number) => {})
rand.randomInt({min: 0, max: 10}, (err: Error, int: number) => {})
rand.randomInt({max: 10}, (err: Error, int: number) => {})
rand.randomInt({min: 10}, (err: Error, int: number) => {})
rand.randomFloat((err: Error, float: number) => {})

rand.randomInts((err: Error, ints: number[]) => {})
rand.randomInts({min: 0, num: 10}, (err: Error, ints: number[]) => {})
rand.randomInts({num: 10}, (err: Error, ints: number[]) => {})
rand.randomInts({num: 10, unique: true}, (err: Error, ints: number[]) => {})
rand.randomFloats((err: Error, floats: number[]) => {})
rand.randomFloats({num: 10}, (err: Error, floats: number[]) => {})
rand.randomFloats({num: 10, unique: true}, (err: Error, floats: number[]) => {})

const proms = rand.promise()

proms.randomInt().then((int: number) => {})
proms.randomInt({min: 0, max: 10}).then((int: number) => {})
proms.randomFloat().then((float: number) => {})

proms.randomInts().then((int: number[]) => {})
proms.randomInts({min: 0, max: 10}).then((int: number[]) => {})
proms.randomInts({max: 10, num: 10}).then((int: number[]) => {})
proms.randomInts({num: 10, unique: true}).then((int: number[]) => {})

proms.randomFloats().then((int: number[]) => {})
proms.randomFloats({num: 10}).then((int: number[]) => {})
proms.randomFloats({num: 10, unique: true}).then((int: number[]) => {})
