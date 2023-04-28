/* eslint-disable no-console */

/*
$ node benchmarks/append.js
$ npx playwright-test benchmarks/append.js --runner benchmark
*/

import Benchmark from 'benchmark'
import BufferList from 'bl/BufferList.js'
import { Uint8ArrayList } from '../dist/src/index.js'

/* 
append BufferList x 5,380,072 ops/sec ±0.49% (97 runs sampled)
append Uint8ArrayList x 7,916,662 ops/sec ±0.52% (97 runs sampled)
*/
const bufs = []
for (let j = 0; j < 1; j++) {
  bufs.push(Uint8Array.from([j, 1, 2, 3, 4, 5]))
}

const suite = new Benchmark.Suite()

suite
  .add('append BufferList', () => {
    const list = new BufferList()

    for (const buf of bufs) {
      list.append(buf)
    }
  })
  .add('append Uint8ArrayList', () => {
    const list = new Uint8ArrayList()

    for (const buf of bufs) {
      list.append2(buf)
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
