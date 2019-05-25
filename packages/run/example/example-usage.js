'use strict'
const { TheRun } = require('@the-/run')

async function tryExample() {
  const runner = new TheRun()
  await runner.run('bin/app.js')
}

tryExample().catch((err) => console.error(err))
