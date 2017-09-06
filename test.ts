import * as rand from './'

let num: number
let nums: number[]

num = rand.intSync()
num = rand.intSync({min: 0, max: 10})
num = rand.intSync({min: 10})
num = rand.intSync({max: 10})
num = rand.floatSync()

nums = rand.intsSync()
nums = rand.intsSync({min: 0, max: 10})
nums = rand.intsSync({min: 0, max: 10, num: 100})
nums = rand.intsSync({min: 10})
nums = rand.intsSync({max: 10})
nums = rand.floatsSync()
nums = rand.floatsSync({num: 100})

rand.int((err: Error, int: number) => {})
rand.int({min: 0, max: 10}, (err: Error, int: number) => {})
rand.int({max: 10}, (err: Error, int: number) => {})
rand.int({min: 10}, (err: Error, int: number) => {})
rand.float((err: Error, float: number) => {})

rand.ints((err: Error, ints: number[]) => {})
rand.ints({min: 0, num: 10}, (err: Error, ints: number[]) => {})
rand.ints({num: 10}, (err: Error, ints: number[]) => {})
rand.ints({num: 10, unique: true}, (err: Error, ints: number[]) => {})
rand.floats((err: Error, floats: number[]) => {})
rand.floats({num: 10}, (err: Error, floats: number[]) => {})
rand.floats({num: 10, unique: true}, (err: Error, floats: number[]) => {})

rand.int().then((int: number) => {})
rand.int({min: 0, max: 10}).then((int: number) => {})
rand.float().then((float: number) => {})

rand.ints().then((int: number[]) => {})
rand.ints({min: 0, max: 10}).then((int: number[]) => {})
rand.ints({max: 10, num: 10}).then((int: number[]) => {})
rand.ints({num: 10, unique: true}).then((int: number[]) => {})

rand.floats().then((int: number[]) => {})
rand.floats({num: 10}).then((int: number[]) => {})
rand.floats({num: 10, unique: true}).then((int: number[]) => {})
