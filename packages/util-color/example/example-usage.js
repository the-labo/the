'use strict'

const {colorWithAlpha} = require('the-color')

async function tryExample () {
  console.log(colorWithAlpha('#AAA',0.5)) // -> rgba(170, 170, 170, 0.5)
}

tryExample().catch((err) => console.error(err))
