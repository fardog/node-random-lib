// Type definitions for random-lib 2.1.0
// Project: random-lib
// Definitions by: Nathan Wittstock <fardog.io>

export as namespace randomLib
export = randomLib

declare namespace randomLib {
    export function randomFloat(): number
    export function randomFloat(ready: ReadyFn): void
    export function randomFloats(opts: MultiAsyncOptions, ready: MultiReadyFn): void
    export function randomFloats(ready: MultiReadyFn): void
    export function randomFloats(): number[]
    export function randomFloats(opts?: MultiOptions): number[]
    export function randomInt(opts: IntOptions, ready: ReadyFn): void
    export function randomInt(ready: ReadyFn): void
    export function randomInt(opts?: IntOptions): number
    export function randomInts(opts: MultiAsyncIntOptions, ready: MultiReadyFn): void
    export function randomInts(ready: MultiReadyFn): void
    export function randomInts(opts?: MultiIntOptions): number[]

    export function promise(p?: PromiseConstructorLike): Promisified

    export interface MultiOptions {
        num?: number
    }
    export interface AsyncOptions {
        unique?: boolean
    }
    export interface MultiAsyncOptions extends MultiOptions, AsyncOptions {}

    export interface IntOptions {
        min?: number
        max?: number
    }
    export interface MultiIntOptions extends IntOptions, MultiOptions {}
    export interface MultiAsyncIntOptions extends IntOptions, MultiAsyncOptions {}

    export type ReadyFn = (err: Error, num: number) => void
    export type MultiReadyFn = (err: Error, nums: number[]) => void

    export interface Promisified {
        randomFloat(): Promise<number>
        randomFloats(opts?: MultiAsyncOptions): Promise<number[]>
        randomInt(opts?: MultiIntOptions): Promise<number>
        randomInts(opts?: MultiAsyncIntOptions): Promise<number[]>
    }
}
