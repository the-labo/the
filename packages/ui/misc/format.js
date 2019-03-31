#!/usr/bin/env node
'use strict'

const fmtjson = require('fmtjson')

fmtjson([`${__dirname}/../lib/*.json`], {
  sort: true,
})
