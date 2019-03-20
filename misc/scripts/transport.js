#!/usr/bin/env node

'use strict'

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
    [`../the-templates`]: { kind: 'templates', name: 'templates' },
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
      spawnSync(`npm`, ['deprecate', path.basename(from), msg], {
        cwd: fromDir,
      })
    }
    const toPkgFile = path.resolve(toDir, 'package.json')
    const toPkg = JSON.parse(await readFile(toPkgFile))

    await unlink(path.resolve(toDir, 'ci/release.js')).catch(() => null)
    await unlink(path.resolve(toDir, 'ci/share.js')).catch(() => null)
    await unlink(path.resolve(toDir, 'LICENSE')).catch(() => null)
    await unlink(path.resolve(toDir, '.travis.yml')).catch(() => null)
    await unlink(path.resolve(toDir, '.LICENSE.bud')).catch(() => null)
    rimraf.sync(path.resolve(toDir, '.git'))
    rimraf.sync(path.resolve(toDir, 'ci'))
    await unlink(path.resolve(toDir, 'jsdoc.json')).catch(() => null)
    await unlink(path.resolve(toDir, '.gitignore')).catch(() => null)

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
