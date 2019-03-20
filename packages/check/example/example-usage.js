'use strict'

const { unlessProduction } = require('@the-/check')

async function tryExample() {
  function myFunc(someArg) {
    // Run check only if `process.env.NODE_ENV !=== 'production'`
    unlessProduction(({ equal, ok }) => {
      ok(someArg, 'someArg is required!')
      equal(typeof someArg === 'string', 'someArg must be a string!')
    })
  }

  myFunc('hoge')
}

tryExample().catch((err) => console.error(err))
