'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const { unlessProduction } = require('@the-/check-env')

async function tryExample() {
  function myFunc(someArg) {
    // Run check only if `process.env.NODE_ENV !=== 'production'`
    unlessProduction(() => {
      ok(someArg, 'someArg is required!')
      equal(typeof someArg === 'string', 'someArg must be a string!')
    })
  }

  myFunc('hoge')
}

tryExample().catch((err) => console.error(err))
