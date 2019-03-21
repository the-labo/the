#!/usr/bin/env node
'use strict'

const theDB = require('../../lib')

;(async () => {

  const db = theDB({
    dialect: 'memory',
    username: 'hoge',
    password: 'hogehoge'
  })

  await db.cli()
})().catch((err) => {
  console.error(err)
  process.exit(1)
})

