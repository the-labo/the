'use strict'

const { readAsJsonSync } = require('@the-/util-file')

async function tryExample() {
  const data = readAsJsonSync('conf/foo.json')
  console.log(data)
}

tryExample().catch((err) => console.error(err))
