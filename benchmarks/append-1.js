/* eslint-disable no-console */

/*
$ node benchmarks/append.js
$ npx playwright-test benchmarks/append.js --runner benchmark
*/

/* 

admin@MacBook-Pro-3 uint8arraylist % node benchmarks/append.js
append BufferList x 1,099,776 ops/sec ±0.62% (94 runs sampled)
append Uint8ArrayList x 5,502,069 ops/sec ±0.67% (97 runs sampled)

*/ 

import Benchmark from 'benchmark'
import BufferList from 'bl/BufferList.js'
import { Uint8ArrayList } from '../dist/src/index.js'

const bufs = []
for (let j = 0; j < 1; j++) {
  bufs.push(Uint8Array.from([j, 1, 2, 3, 4, 5]))
}

const suite = new Benchmark.Suite()

suite
  .add('fallback', () => {
    const list = {}

    for (const buf of bufs) {
      list.buf = buf;
    }
  })
  .add('append Uint8ArrayList', () => {
    const list = new Uint8ArrayList()

    for (const buf of bufs) {
      list.append(buf)
    }
  })

suite
  // add listeners
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ async: true })
