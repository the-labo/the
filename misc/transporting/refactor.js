#!/usr/bin/env
'use strict'

const aglob = require('aglob')
process.chdir(baseDir)
const { spawnSync } = require('child_process')
const path = require('path')
const { TheRefactor } = require('the-refactor')
const transporting = require('./transporting')
const baseDir = `${__dirname}/../..`

async function main() {
  for (const pkgPath of await aglob(path.resolve('packages/*/package.json'))) {
    const pkgDir = path.dirname(pkgPath)
    process.chdir(pkgDir)
    console.log(`=== ${path.relative(baseDir, pkgDir)} ===`)
    const pkg = require(pkgPath)
    for (const [oldName] of Object.entries(pkg.dependencies || {})) {
      if (oldName in transporting) {
        const newName = `@the-/${transporting[oldName].name}`
        console.log(`Change deps "${oldName}" to "${newName}"...`)
        spawnSync('npm', ['un', oldName], { cwd: pkgDir, stdio: 'inherit' })
        spawnSync('npm', ['i', newName], { cwd: pkgDir, stdio: 'inherit' })
      }
    }
    for (const [oldName] of Object.entries(pkg.devDependencies || {})) {
      if (oldName in transporting) {
        const newName = `file:../${transporting[oldName].name}`
        console.log(`Change dev deps "${oldName}" to "${newName}"...`)
        spawnSync('npm', ['un', oldName], { cwd: pkgDir, stdio: 'inherit' })
        spawnSync('npm', ['i', newName], { cwd: pkgDir, stdio: 'inherit' })
      }
    }
    for (const [oldName] of Object.entries(transporting)) {
      const newName = `@the-/${transporting[oldName].name}`
      console.log(`Refactor "${oldName}" to "${newName}"...`)
      const refactor = new TheRefactor()
      await refactor.rewrite(
        [
          '+(assets|bin|lib|client|conf|doc|misc|server|test)/**/*.js',
          '+(assets|bin|lib|client|conf|doc|misc|server|test)/**/.*.bud',
          '*.js',
          '.*.bud',
        ],
        {
          [`require('${oldName}')`]: [`require('${newName}')`],
          [`from '${oldName}'`]: [`from '${newName}'`],
        },
        { cwd: pkgDir },
      )
    }
  }
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
