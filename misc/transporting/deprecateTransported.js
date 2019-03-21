#!/usr/bin/env node

const baseDir = `${__dirname}/../..`
process.chdir(baseDir)
const path = require('path')
const aglob = require('aglob')
const transporting = require('./transporting')
const { spawnSync } = require('child_process')

async function main() {
  for (const [oldName] of Object.entries(transporting)) {
    const { name } = transporting[oldName]
    const newName = `@the-/${name}`
    spawnSync('npm', ['deprecate', oldName, `move to ${newName} ( https://github.com/the-labo/the/tree/master/packages/${name}#readme ) `], { stdio: 'inherit' })
  }
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
