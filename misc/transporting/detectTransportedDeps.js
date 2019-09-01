#!/usr/bin/env node
'use strict'

const aglob = require('aglob')
const path = require('path')
const transporting = require('./transporting.json')

const baseDir = `${__dirname}/../..`
process.chdir(baseDir)
;(async () => {
  for (const pkgPath of await aglob(
    path.resolve(baseDir, 'packages/*/package.json'),
  )) {
    const pkgDir = path.dirname(pkgPath)

    const pkg = require(pkgPath)

    for (const [name] of Object.entries(pkg.dependencies || {})) {
      if (name in transporting) {
        console.log(
          `Detect transported pkg ${name} in ${path.relative('.', pkgDir)}`,
        )
      }
    }
    for (const [name] of Object.entries(pkg.devDependencies || {})) {
      if (name in transporting) {
        console.log(
          `Detect transported pkg ${name} in ${path.relative('.', pkgDir)}`,
        )
      }
    }
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
