#!/usr/bin/env node

'use strict'

const aglob = require('aglob')
const { copyAsync, copyDirAsync } = require('asfs')
const { spawnSync } = require('child_process')
const {
  chmod,
  readFile,
  rename,
  stat,
  unlink,
  writeFile,
} = require('fs').promises
const path = require('path')
const rimraf = require('rimraf')
const { TheRefactor } = require('the-refactor')
const transporting = require('./transporting')
const pkg = require('../../package')
const baseDir = `${__dirname}/../..`

process.chdir(baseDir)

;(async () => {
  for (const [fromPkgName, { kind, name }] of Object.entries(transporting)) {
    const fromDir = path.resolve(baseDir, '..', fromPkgName)
    const toDir = path.resolve(baseDir, 'packages', name)
    const toStat = await stat(toDir).catch(() => null)
    const fromREADME = path.resolve(fromDir, 'README.md')
    if (!toStat) {
      spawnSync('cp', ['-R', fromDir, toDir])
      await chmod(fromREADME, '644')
      await unlink(path.resolve(fromDir, '.README.md.bud')).catch(() => null)
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
    const filesToRemove = [
      'ci/release.js',
      'ci/share.js',
      'doc/api/.api.md.bud',
      'LICENSE',
      '.travis.yml',
      '.LICENSE.bud',
      'jsdoc.json',
      '.gitignore',
    ]
    for (const filename of filesToRemove) {
      await unlink(path.resolve(toDir, filename)).catch(() => null)
    }
    const dirsToRemove = ['.git', 'ci', 'shim', 'doc/guides']
    for (const dirname of dirsToRemove) {
      rimraf.sync(path.resolve(toDir, dirname))
    }
    await copyAsync(
      path.resolve(baseDir, '.npmignore'),
      path.resolve(toDir, '.npmignore'),
    )
    if (/^component-demo/.test(name)) {
      continue
    }
    if (!/demo/.test(name)) {
      if (['component'].includes(kind)) {
        const demoComponentDir = path.resolve(
          baseDir,
          'packages',
          'demo-component',
        )
        const refactor = new TheRefactor()
        await refactor.rewrite('example/*.jsx', {
          [`from '${fromPkgName}'`]: [`from '@the-/${name}'`],
        })

        const filenamesToCopy = [
          '.README.md.bud',
          'doc/links.json',
          'doc/demo/entrypoint.jsx',
          'doc/demo/.index.html.bud',
          'lib/.index.jsx.bud',
          'test/.test.js.bud',
          'test/.npmignore',
        ]
        for (const filename of filenamesToCopy) {
          await copyAsync(
            `${demoComponentDir}/${filename}`,
            `${toDir}/${filename}`,
          )
        }
        const filenamesToUnlink = [
          'lib/.index.bud',
          'lib/.index.js.bud',
          'signature.json',
        ]
        for (const filename of filenamesToUnlink) {
          await unlink(path.resolve(toDir, filename)).catch(() => null)
        }
        const toPkg = JSON.parse(await readFile(toPkgFile))
        const { scripts = {} } = toPkg
        scripts.doc = 'the-script-doc'
        scripts.build = 'the-script-build'
        scripts.test = 'the-script-build'
        scripts.prepare = 'npm run build && npm run doc'
        delete scripts.share
        delete scripts.buid

        {
          const devDepsToAdd = {
            '@the-/script-build': 'file:../script-build',
            '@the-/script-doc': 'file:../script-doc',
            '@the-/script-test': 'file:../script-test',
            '@the-/templates': 'file:../templates',
          }
          for (const [name, src] of Object.entries(devDepsToAdd)) {
            if (!(name in toPkg.devDependencies)) {
              if (toPkg.name === name) {
                continue
              }
              spawnSync('npm', ['i', src, '-D'], { cwd: toDir })
            }
          }
        }
        const depsToRemove = ['coz']
        for (const name of depsToRemove) {
          const has = name in (toPkg.dependencies || {})
          if (has) {
            spawnSync('npm', ['un', '-D', name], { cwd: toDir })
          }
        }
        const devDepsToAdd = {
          '@the-/component-demo': 'file:../component-demo',
          coz: '*',
        }
        for (const [name, version] of Object.entries(devDepsToAdd)) {
          const has = name in (toPkg.devDependencies || {})
          if (!has) {
            if (/^file:/.test(version)) {
              spawnSync('npm', ['i', '-D', version], { cwd: toDir })
            } else {
              spawnSync('npm', ['i', '-D', name], { cwd: toDir })
            }
          }
        }
        await writeFile(toPkgFile, JSON.stringify({ ...toPkg, name: `@the-/${name}`, scripts }))

        for (const testJsx of await aglob('test/*.jsx', { cwd: toDir })) {
          const basename = path.basename(testJsx, '.jsx')
          rename(
            path.resolve(toDir, testJsx),
            path.resolve(toDir, 'test', basename + '.js'),
          )
        }
      }
      if (['lib', 'util', 'mixins'].includes(kind)) {
        const demoLibDir = path.resolve(baseDir, 'packages', 'demo-lib')
        rimraf.sync(path.resolve(toDir, 'doc/readme'))
        await copyDirAsync(`${demoLibDir}/doc/readme`, `${toDir}/doc/readme`)
        await unlink(path.resolve(toDir, 'lib/.index.bud')).catch(() => null)
        const filesToCopy = [
          'doc/links.json',
          'doc/overview.md',
          'lib/.index.js.bud',
          'test/.test.js.bud',
          '.README.md.bud',
          '.npmignore',
        ]
        for (const filename of filesToCopy) {
          await copyAsync(`${demoLibDir}/${filename}`, `${toDir}/${filename}`)
        }
        const toPkg = JSON.parse(await readFile(toPkgFile))
        const { scripts = {} } = toPkg
        scripts.doc = 'the-script-doc'
        scripts.build = 'the-script-build'
        scripts.test = 'the-script-build'
        scripts.prepare = 'npm run build && npm run doc'
        delete scripts.share
        delete scripts.buid
        await writeFile(
          toPkgFile,
          JSON.stringify({
            ...toPkg,
            name: `@the-/${name}`,
            scripts,
          }, null, 2),
        )
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
        'the-component-demo',
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
          spawnSync('npm', ['i', src, '-D'], { cwd: toDir })
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
      const { scripts = {}, dependencies = {}, devDependencies = {} } = toPkg
      for (const [name, ver] of Object.entries(dependencies)) {
        if (/^file/.test(ver)) {
          devDependencies[name] = ver
          delete dependencies[name]
        }
      }
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
            keywords: ['the', kind].filter(Boolean).sort(),
            name: `@the-/${name}`,
            publishConfig: {
              access: 'public',
            },
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
