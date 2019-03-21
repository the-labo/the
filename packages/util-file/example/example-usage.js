'use strict'

const {readAsJsonSync, writeAsJsonSync} = require('the-file-util')

async function tryExample () {
  const data = readAsJsonSync('conf/foo.json')
}

tryExample().catch((err) => console.error(err))
