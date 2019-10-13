'use strict'

const fs = require('fs')
const { pipeToFile } = require('@the-/util-server')

async function tryExample() {
  await pipeToFile(fs.createReadStream('src.txt'), 'dest.txt')
}

void tryExample().catch((err) => console.error(err))
