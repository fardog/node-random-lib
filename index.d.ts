// Type definitions for random-lib 2.1.0
// Project: random-lib
// Definitions by: Nathan Wittstock <fardog.io>

export as namespace randomLib
export = randomLib

declare namespace randomLib {
    export function float(): Promise<number>
    export function float(ready: ReadyFn): void

    export function int(opts?: IntOptions): Promise<number>
    export function int(opts: IntOptions, ready: ReadyFn): void
    export function int(ready: ReadyFn): void

    export function floats(opts?: MultiAsyncOptions): Promise<number[]>
    export function floats(opts: MultiAsyncOptions, ready: MultiReadyFn): void
    export function floats(ready: MultiReadyFn): void

    export function ints(opts?: MultiAsyncIntOptions): Promise<number[]>
    export function ints(opts: MultiAsyncIntOptions, ready: MultiReadyFn): void
    export function ints(ready: MultiReadyFn): void

    export function floatSync(): number

    export function intSync(opts?: IntOptions): number

    export function floatsSync(opts?: MultiOptions): number[]

    export function intsSync(opts?: MultiIntOptions): number[]

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
}
