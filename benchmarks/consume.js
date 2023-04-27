/* eslint-disable no-console */

/*
$ node benchmarks/sublist.js
$ npx playwright-test benchmarks/sublist.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { Uint8ArrayList } from '../dist/src/index.js'

const bufs = []
for (let j = 0; j < 10; j++) {
  bufs.push(Uint8Array.from([j, 1, 2, 3, 4, 5]))
}



/* 
consume Uint8ArrayList x 4,200,770 ops/sec ±0.60% (92 runs sampled)
*/

const suite = new Benchmark.Suite()

suite
  .add('consume Uint8ArrayList', () => {
    const list = new Uint8ArrayList(...bufs)
    list.consume(list.length)
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
