#!/usr/bin/env node

console.log('mock bin 02')

setTimeout(() => {
  throw new Error('hoge')
}, 100)
