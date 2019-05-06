#!/usr/bin/env node
'use strict'

const aglob = require('aglob')
const { spawnSync } = require('child_process')
const path = require('path')
const { writeAsJson } = require('@the-/util-file')

;(async () => {
  const baseDir = `${__dirname}/../..`
  const prepareSnippet = '../../misc/scripts/pkgSharedInstall.sh'
  const pkg = require('../../package')
  const subPkgFiles = await aglob(
    path.resolve(`${baseDir}/packages/*/package.json`),
  )
  for (const subPkgFile of subPkgFiles) {
    const subPkg = require(subPkgFile)
    const { scripts = {} } = subPkg
    const { prepare = '' } = scripts
    if (!prepare.includes(prepareSnippet)) {
      subPkg.scripts = {
        ...scripts,
        prepare: [prepareSnippet, prepare].filter(Boolean).join(';'),
      }
      await writeAsJson(subPkgFile, subPkg)
    }
    const devDependenciesToRemove = Object.keys(subPkg.devDependencies || {})
      .filter((name) => name in (pkg.devDependencies || {}))
      .filter((name) => !/eslint/.test(name))
      .filter((name) => !/@the-\/script-/.test(name))
    if (devDependenciesToRemove.length > 0) {
      console.log(
        `Remove ${devDependenciesToRemove} form ${path.relative(
          process.cwd(),
          subPkgFile,
        )} ...`,
      )
      spawnSync(`npm`, ['un', ...devDependenciesToRemove, '-D'], {
        cwd: path.dirname(subPkgFile),
        stdio: 'inherit',
      })
    }
  }
})()
