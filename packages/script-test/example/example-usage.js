'use strict'

const test = require('@the-/script-test')

async function tryExample() {
  await test('my_project_dir')
}

tryExample().catch(console.error)
