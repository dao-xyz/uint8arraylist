/* eslint-disable no-console */

/*
$ node benchmarks/consume.js
$ npx playwright-test benchmarks/sublist.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { Uint8ArrayList } from '../dist/src/index.js'

const bufs = []
for (let j = 0; j < 10; j++) {
  bufs.push(Uint8Array.from([j, 1, 2, 3, 4, 5,6,7,8, 9]))
}



/* 
consume all Uint8ArrayList x 4,324,242 ops/sec ±0.36% (94 runs sampled)
consume partially Uint8ArrayList x 2,712,218 ops/sec ±1.23% (99 runs sampled)
*/

const suite = new Benchmark.Suite()
let totalLength = (new Uint8ArrayList(...bufs)).length; 
suite
  .add('consume all Uint8ArrayList', () => {
    const list = new Uint8ArrayList(...bufs)
    list.consume(totalLength) 
  })
  .add('consume partially Uint8ArrayList', () => {
    const list = new Uint8ArrayList(...bufs)
    list.consume(totalLength -1) // leave 1 element
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
