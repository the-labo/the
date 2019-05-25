'use strict'
const { create: theLoc } = require('@the-/loc')

const env = theLoc({
  en: require('./en'),
})

module.exports = env
