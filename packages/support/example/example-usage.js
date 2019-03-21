'use strict'

const {TheSupport} = require('the-support')

async function tryExample () {
  const support = new TheSupport('public/bundle/**/*.js')

  await support.es5() // Throw error unless es5 compatible
}

tryExample().catch((err) => console.error(err))
