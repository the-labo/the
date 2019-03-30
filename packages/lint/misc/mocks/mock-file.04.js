'use strict'

try {
  const hoge = require('___not_exists__')
  console.log(hoge)
  module.exports = { hoge }
} catch (e) {}
