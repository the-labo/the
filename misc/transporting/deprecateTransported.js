#!/usr/bin/env node
'use strict'

const { spawnSync } = require('child_process')
const transporting = require('./transporting.json')

const baseDir = `${__dirname}/../..`
process.chdir(baseDir)

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
