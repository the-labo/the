#!/usr/bin/env node
'use strict'

process.chdir(`${__dirname}/../..`)

const { TheRefactor } = require('@the-/refactor')
const { EOL } = require('os')

async function main() {
  await new TheRefactor().convert('packages/*/.npmignore', (content) => {
    const lines = content.split(EOL)

    const adding = ['doc', 'example', 'test', '/*.html', 'var', 'misc/mocks']
    for (const k of adding) {
      const found = lines.some((line) => line.trim() === k.trim())
      if (!found) {
        return [...lines, k].join(EOL)
      }
    }
    const removing = ['*.html']
    for (const k of removing) {
      const found = lines.some((line) => line.trim() === k.trim())
      if (found) {
        return [...lines].filter((line) => line.trim() !== k.trim()).join(EOL)
      }
    }
  })
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
