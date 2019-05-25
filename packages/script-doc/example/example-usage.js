'use strict'
const doc = require('@the-/script-doc')

async function tryExample() {
  await doc('my_project_dir')
}

tryExample().catch(console.error)
