#!/usr/bin/env node

'use strict'

const { copyAsync, copyDirAsync } = require('asfs')
const { spawnSync } = require('child_process')
const { chmod, readFile, stat, unlink, writeFile } = require('fs').promises
const path = require('path')
const rimraf = require('rimraf')
const pkg = require('../../package')
const baseDir = `${__dirname}/../..`
process.chdir(baseDir)

const packages = {
  [`../the-script-build`]: { kind: 'script', name: 'script-build' },
  [`../the-script-test`]: { kind: 'script', name: 'script-test' },
  [`../the-demo-lib`]: { kind: 'lib', name: 'demo-lib' },
  [`../the-demo-component`]: { kind: 'component', name: 'demo-component' },
  [`../the-scaffold`]: { kind: 'scaffold', name: 'scaffold' },
  [`../the-templates`]: { kind: 'templates', name: 'templates' },
  [`../the-assert`]: { kind: 'lib', name: 'assert' },
  [`../the-assets`]: { kind: 'lib', name: 'assets' },
  [`../the-check`]: { kind: 'lib', name: 'check' },
  [`../the-window`]: { kind: 'lib', name: 'window' },
  [`../the-bin`]: { kind: 'lib', name: 'bin' },
  [`../the-context`]: { kind: 'lib', name: 'context' },
}

;(async () => {
  for (const [from, { kind, name }] of Object.entries(packages)) {
    const fromDir = path.resolve(baseDir, from)
    const toDir = path.resolve(baseDir, 'packages', name)
    const toStat = await stat(toDir).catch(() => null)
    const fromREADME = path.resolve(from, 'README.md')
    if (!toStat) {
      spawnSync('cp', ['-R', fromDir, toDir])
      await chmod(fromREADME, '644')
      await unlink(path.resolve(from, '.README.md.bud')).catch(() => null)
      const msg = `This package moved to [@the-/${name}](https://www.npmjs.com/package/@the-/${name})`
      await writeFile(
        fromREADME,
        `## NO LONGER MAINTAINED

${msg}
      `,
      )
      spawnSync('git', ['add', '.'], { cwd: fromDir })
      spawnSync('git', ['commit', '-m', 'Deprecate'], { cwd: fromDir })
      spawnSync('git', ['push'], { cwd: fromDir })
      spawnSync(`npm`, ['deprecate', path.basename(fromDir), msg], {
        cwd: fromDir,
      })
    }
    const fromPkgFile = path.resolve(fromDir, 'package.json')
    const toPkgFile = path.resolve(toDir, 'package.json')
    const toPkg = JSON.parse(await readFile(toPkgFile))

    await unlink(path.resolve(toDir, 'ci/release.js')).catch(() => null)
    await unlink(path.resolve(toDir, 'ci/share.js')).catch(() => null)
    await unlink(path.resolve(toDir, 'doc/api/.api.md.bud')).catch(() => null)
    await unlink(path.resolve(toDir, 'LICENSE')).catch(() => null)
    await unlink(path.resolve(toDir, '.travis.yml')).catch(() => null)
    await unlink(path.resolve(toDir, '.LICENSE.bud')).catch(() => null)
    rimraf.sync(path.resolve(toDir, '.git'))
    rimraf.sync(path.resolve(toDir, 'ci'))
    rimraf.sync(path.resolve(toDir, 'shim'))
    rimraf.sync(path.resolve(toDir, 'doc/guides'))
    await unlink(path.resolve(toDir, 'jsdoc.json')).catch(() => null)
    await unlink(path.resolve(toDir, '.gitignore')).catch(() => null)

    if (!/demo/.test(name)) {
      if (kind === 'lib') {
        const demoLibDir = path.resolve(baseDir, 'packages', 'demo-lib')
        rimraf.sync(path.resolve(toDir, 'doc/readme'))
        await copyDirAsync(`${demoLibDir}/doc/readme`, `${toDir}/doc/readme`)
        await copyAsync(
          `${demoLibDir}/doc/links.json`,
          `${toDir}/doc/links.json`,
        )
        await copyAsync(
          `${demoLibDir}/doc/overview.md`,
          `${toDir}/doc/overview.md`,
        )
        await unlink(path.resolve(toDir, 'lib/.index.bud')).catch(() => null)
        await copyAsync(
          `${demoLibDir}/lib/.index.js.bud`,
          `${toDir}/lib/.index.js.bud`,
        )
        await copyAsync(
          `${demoLibDir}/test/.test.js.bud`,
          `${toDir}/test/.test.js.bud`,
        )
        await copyAsync(
          `${demoLibDir}/.README.md.bud`,
          `${toDir}/.README.md.bud`,
        )
        await copyAsync(`${demoLibDir}/.npmignore`, `${toDir}/.npmignore`)
        const toPkg = JSON.parse(await readFile(toPkgFile))
        const { scripts = {} } = toPkg
        scripts.doc = 'the-script-doc'
        scripts.build = 'the-script-build'
        scripts.test = 'the-script-build'
        scripts.prepare = 'npm run build && npm run doc'
        delete scripts.share
        delete scripts.buid
        await writeFile(toPkgFile, JSON.stringify({ ...toPkg, scripts }))
      }
    }

    const { dependencies = {}, devDependencies = {} } = toPkg
    // Cleanup
    {
      const depsToRemove = []
      for (const name of depsToRemove) {
        if (name in dependencies) {
          console.log(`remove ${name} from ${toDir}...`)
          spawnSync('npm', ['un', name], { cwd: toDir })
        }
      }
      const devDepsToRemove = [
        'the-script-share',
        'the-script-update',
        'ape-tasking',
        'ape-formatting',
        'the-script-release',
        'the-script-test',
        'the-script-doc',
        'the-script-jsdoc',
        'the-templates',
        'the-script-build',
        'ape-releasing',
        'amocha',
        'mocha',
        'ape-tmpl',
        'ape-updating',
      ]
      for (const name of devDepsToRemove) {
        if (name in devDependencies) {
          console.log(`remove ${name} from ${toDir}...`)
          spawnSync('npm', ['un', '-D', name], { cwd: toDir })
        }
      }
    }
    // add
    {
      const devDepsToAdd = {
        '@the-/script-build': 'file:../script-build',
        '@the-/script-doc': 'file:../script-doc',
        '@the-/script-test': 'file:../script-test',
        '@the-/templates': 'file:../templates',
      }
      for (const [name, src] of Object.entries(devDepsToAdd)) {
        if (!(name in devDependencies)) {
          if (toPkg.name === name) {
            continue
          }
          spawnSync('npm', ['i', '-D', src], { cwd: toDir })
        }
      }
    }
    // example
    {
      const exampleUsageJs = path.resolve(toDir, 'example/example-usage.js')
      const example = await readFile(exampleUsageJs).catch(() => null)
      if (example) {
        const fromPkg = JSON.parse(await readFile(fromPkgFile))
        await writeFile(
          exampleUsageJs,
          String(example).replace(fromPkg.name, toPkg.name),
        )
      }
    }
    {
      const toPkg = JSON.parse(await readFile(toPkgFile))
      const { scripts = {} } = toPkg
      delete scripts.update
      delete scripts.release
      await writeFile(
        toPkgFile,
        JSON.stringify(
          {
            ...toPkg,
            author: {
              email: 'okunishinishi@gmail.com',
              name: 'Taka Okunishi',
              url: 'http://okunishitaka.com',
            },
            bugs: {
              url: 'https://github.com/the-labo/the#issues',
            },
            engines: {
              node: '>=10',
              npm: '>=6',
            },
            homepage: `https://github.com/the-labo/the/tree/master/packages/${toPkg.name
              .split('/')
              .pop()}#readme`,
            keywords: ['the', kind].filter(Boolean),
            name: `@the-/${name}`,
            scripts,
            version: pkg.version,
          },
          null,
          2,
        ),
      )
    }
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
