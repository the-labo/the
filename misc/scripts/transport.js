#!/usr/bin/env node

'use strict'

const { spawnSync } = require('child_process')
const { chmod, readFile, stat, unlink, writeFile } = require('fs').promises
const path = require('path')
const pkg = require('../../package')
const rimraf = require('rimraf')
const baseDir = `${__dirname}/../..`
process.chdir(baseDir)

const packages = {
    [`../the-script-build`]: { kind: 'script', name: 'script-build' },
    [`../the-demo-lib`]: { kind: 'lib', name: 'demo-lib' },
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
    await unlink(path.resolve(toDir, 'jsdoc.json')).catch(() => null)
    // Cleanup
    {
      const depsToRemove = [
        'the-script-share',
        'the-script-update',
        'ape-tasking',
        'ape-formatting',
        'ape-releasing',
        'ape-updating',
      ]
      for (const name of depsToRemove) {
        if (name in (toPkg.dependencies || {})) {
          console.log(`remove ${name} from ${toDir}...`)
          spawnSync('npm', ['un', name], { cwd: toDir })
        }
        if (name in (toPkg.devDependencies || {})) {
          console.log(`remove ${name} from ${toDir}...`)
          spawnSync('npm', ['un', '-D', name], { cwd: toDir })
        }
      }
    }
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
            url: 'https://github.com/the-labo/theissues',
          },
          engines: {
            node: '>=10',
            npm: '>=6',
          },
          homepage: `https://github.com/the-labo/the/tree/master/packages/${toPkg.name.split('/').pop()}#readme`,
          keywords: ['the', kind].filter(Boolean),
          name: `@the-/${name}`,
          version: pkg.version,
        },
        null,
        2,
      ),
    )
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
