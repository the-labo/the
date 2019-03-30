#!/usr/bin/env node

const fmtjson = require('fmtjson')

fmtjson([
  `${__dirname}/../lib/*.json`
], {
  sort: true
})
