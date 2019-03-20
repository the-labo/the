'use strict'

const build = require('@the-/script-build')

async function tryExample() {
  await build('my_project_dir')
}

tryExample().catch(console.error)
