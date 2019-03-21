'use strict'

const {TheCode} = require('the-code')

async function tryExample () {
  const theCode = new TheCode()
  await theCode.format('src/**/*.js')
}

tryExample().catch((err) => console.error(err))
