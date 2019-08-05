'use strict'

const { hasBin } = require('@the-/util-bin')

async function tryExample() {
  const hasGit = await hasBin('git')
  if (hasGit) {
    /* ... */
  }
}

tryExample().catch((err) => console.error(err))
