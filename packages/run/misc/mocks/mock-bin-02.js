#!/usr/bin/env node
'use strict'

console.log('mock bin 02')

setTimeout(() => {
  throw new Error('hoge')
}, 100)