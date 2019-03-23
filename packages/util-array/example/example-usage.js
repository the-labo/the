'use strict'

const {
  uniqueFilter,
  keyPathMap
} = require('@the-/util-array')

async function tryExample () {

  console.log(
    ['foo', 'bar', 'foo'].filter(uniqueFilter()) // => ['foo', 'bar']
  )

  console.log(
    [{foo: {bar: 10}}, {foo: {bar: 20}}].map(keyPathMap('foo.bar')) // => [10,20]
  )
}

tryExample().catch((err) => console.error(err))
