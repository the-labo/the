#!/usr/bin/env node
'use strict'

const aglob = require('aglob')
const { spawnSync } = require('child_process')
const path = require('path')
const { TheRefactor } = require('the-refactor')
const transporting = require('./transporting')
const baseDir = `${__dirname}/../..`
process.chdir(baseDir)

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
        spawnSync('npm', ['un', '-D', oldName], { cwd: pkgDir, stdio: 'inherit' })
        spawnSync('npm', ['i', '-D', newName], { cwd: pkgDir, stdio: 'inherit' })
      }
    }
    const refactor = new TheRefactor()
    for (const [oldName] of Object.entries(transporting)) {
      const newName = `@the-/${transporting[oldName].name}`
      console.log(`Refactor "${oldName}" to "${newName}"...`)
      await refactor.rewrite(
        [
          '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/*.js',
          '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/*.jsx',
          '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/.*.bud',
          '*.js',
          '*.jsx',
          '.*.bud',
        ],
        {
          [`require('${oldName}')`]: [`require('${newName}')`],
          [`require('${oldName}/`]: [`require('${newName}/`],
          [`from '${oldName}'`]: [`from '${newName}'`],
          [`from '${oldName}/`]: [`from '${newName}/`],
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
