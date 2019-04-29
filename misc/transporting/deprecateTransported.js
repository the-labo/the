#!/usr/bin/env node
'use strict'

const { spawnSync } = require('child_process')
process.chdir(baseDir)

const transporting = require('./transporting')
const baseDir = `${__dirname}/../..`

async function main() {
  for (const [oldName] of Object.entries(transporting)) {
    const { name } = transporting[oldName]
    const newName = `@the-/${name}`
    spawnSync(
      'npm',
      [
        'deprecate',
        oldName,
        `move to ${newName} ( https://github.com/the-labo/the/tree/master/packages/${name}#readme ) `,
      ],
      { stdio: 'inherit' },
    )
  }
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
