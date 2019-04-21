#!/usr/bin/env node

process.chdir(`${__dirname}/../..`)
const path = require('path')
const { spawnSync } = require('child_process')
const { TheRefactor } = require('@the-/refactor')

const transporting = require('../../../the/misc/transporting/transporting')

async function main() {
  const pkgPath = path.resolve('package.json')
  const pkg = require(pkgPath)
  for (const [oldName] of Object.entries(pkg.dependencies)) {
    if (oldName in transporting) {
      const newName = `@the-/${transporting[oldName].name}`
      console.log(`Change deps "${oldName}" to "${newName}"...`)
      spawnSync('npm', ['un', oldName], { stdio: 'inherit' })
      spawnSync('npm', ['i', newName], { stdio: 'inherit' })
    }
  }
  for (const [oldName] of Object.entries(pkg.devDependencies)) {
    if (oldName in transporting) {
      const newName = `@the-/${transporting[oldName].name}`
      console.log(`Change dev deps "${oldName}" to "${newName}"...`)
      spawnSync('npm', ['un', oldName], { stdio: 'inherit' })
      spawnSync('npm', ['i', newName], { stdio: 'inherit' })
    }
  }
  for (const [oldName] of Object.entries(transporting)) {
    const newName = `@the-/${transporting[oldName].name}`
    console.log(`Refactor "${oldName}" to "${newName}"...`)
    const refactor = new TheRefactor()
    await refactor.rewrite([
      '+(assets|bin|client|conf|doc|misc|server|test)/**/*.js',
      '+(assets|bin|client|conf|doc|misc|server|test)/**/*.jsx',
      '+(assets|bin|client|conf|doc|misc|server|test)/**/.*.bud',
      '*.js',
      '.*.bud',
    ], {
      [`require('${oldName}')`]: [`require('${newName}')`],
      [`require('${oldName}/`]: [`require('${newName}/`],
      [`from '${oldName}'`]: [`from '${newName}'`],
      [`from '${oldName}/`]: [`from '${newName}/`],
      [`import '${oldName}/`]: [`import '${newName}/`],
      [`import('${oldName}'`]: [`import('${newName}'`],
    })
  }
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
