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
const { EOL } = require('os')
const path = require('path')
const rimraf = require('rimraf')
const { TheRefactor } = require('@the-/refactor')
const transporting = require('./transporting')
const pkg = require('../../package')
const baseDir = `${__dirname}/../..`

process.chdir(baseDir)

const _deprecatePackage = async (fromDir, name) => {
  const fromREADME = path.resolve(fromDir, 'README.md')
  await chmod(fromREADME, '644')
  await unlink(path.resolve(fromDir, '.README.md.bud')).catch(() => null)
  const msg = `This package moved to [@the-/${name}](https://www.npmjs.com/package/@the-/${name})`
  await writeFile(
    fromREADME,
    `## NO LONGER MAINTAINED

${msg}
      `,
  )
  spawnSync('git', ['add', '.'], { cwd: fromDir, stdio: 'inherit' })
  spawnSync('git', ['commit', '-m', 'Deprecate'], {
    cwd: fromDir,
    stdio: 'inherit',
  })
  spawnSync('git', ['push'], { cwd: fromDir, stdio: 'inherit' })
  spawnSync(`npm`, ['deprecate', path.basename(fromDir), msg], {
    cwd: fromDir,
    stdio: 'inherit',
  })
}

const _unlinkFiles = async (baseDir, filenames) => {
  for (const filename of filenames) {
    await unlink(path.resolve(baseDir, filename)).catch(() => null)
  }
}

const _unlinkDirs = async (baseDir, dirnames) => {
  for (const dirname of dirnames) {
    rimraf.sync(path.resolve(baseDir, dirname))
  }
}

const _copyFiles = async (fromDir, toDir, filenames) => {
  for (const filename of filenames) {
    await copyAsync(
      path.resolve(fromDir, filename),
      path.resolve(toDir, filename),
    )
  }
}
const _addDevDeps = async (baseDir, devDeps) => {
  const pkg = JSON.parse(await readFile(path.resolve(baseDir, 'package.json')))
  for (const [name, version] of Object.entries(devDeps)) {
    if (pkg.name === name) {
      continue
    }
    const has = name in (pkg.devDependencies || {})
    if (has) {
      continue
    }
    if (/^file:/.test(version)) {
      spawnSync('npm', ['i', '-D', version], { cwd: baseDir, stdio: 'inherit' })
    } else {
      spawnSync('npm', ['i', '-D', name], { cwd: baseDir, stdio: 'inherit' })
    }
  }
}

const _rewritePkg = async (baseDir, converter) => {
  const pkgFile = path.resolve(baseDir, 'package.json')
  const pkg = JSON.parse(await readFile(pkgFile))
  await writeFile(
    pkgFile,
    JSON.stringify(
      {
        ...pkg,
        ...converter(pkg),
      },
      null,
      2,
    ) + EOL,
  )
}

const _removeDevDeps = async (baseDir, names) => {
  const pkg = JSON.parse(await readFile(path.resolve(baseDir, 'package.json')))
  for (const name of names) {
    const has = name in (pkg.devDependencies || {})
    if (has) {
      spawnSync('npm', ['un', '-D', name], { cwd: baseDir, stdio: 'inherit' })
    }
  }
}

;(async () => {
  for (const [fromPkgName, { kind, name }] of Object.entries(transporting)) {
    const fromDir = path.resolve(baseDir, '..', fromPkgName)
    const hasFrom = !!(await stat(fromDir).catch(() => null))
    if (!hasFrom) {
      console.warn(`"${fromPkgName}" is not found in local`)
      continue
    }
    console.log(`== ${fromPkgName} => ${name} ===`)
    const toDir = path.resolve(baseDir, 'packages', name)
    const toStat = await stat(toDir).catch(() => null)

    if (!toStat) {
      spawnSync('cp', ['-R', fromDir, toDir], { stdio: 'inherit' })
      await _deprecatePackage(fromDir, name)
    }
    const fromPkgFile = path.resolve(fromDir, 'package.json')
    const toPkgFile = path.resolve(toDir, 'package.json')
    const toPkg = JSON.parse(await readFile(toPkgFile))
    await _unlinkFiles(toDir, [
      'ci/release.js',
      'ci/share.js',
      'doc/api/.api.md.bud',
      'LICENSE',
      '.travis.yml',
      '.LICENSE.bud',
      'jsdoc.json',
      '.gitignore',
    ])
    await _unlinkDirs(toDir, ['.git', 'ci', 'shim', 'doc/guides'])
    await _copyFiles(baseDir, toDir, ['.npmignore'])
    if (/^component-demo/.test(name)) {
      continue
    }
    if (!/demo/.test(name)) {
      if (['ui'].includes(kind)) {
        const demoComponentDir = path.resolve(
          baseDir,
          'packages',
          'demo-ui',
        )
        const demoComponentPkg = require(path.resolve(
          demoComponentDir,
          'package.json',
        ))
        const refactor = new TheRefactor()
        await refactor.rewrite('example/*.jsx', {
          [`from '${fromPkgName}'`]: [`from '@the-/${name}'`],
        })

        await _copyFiles(demoComponentDir, toDir, [
          '.README.md.bud',
          'doc/links.json',
          'doc/demo/entrypoint.jsx',
          'doc/demo/.index.html.bud',
          'lib/.index.jsx.bud',
          'test/.test.js.bud',
          'test/.npmignore',
        ])
        await _unlinkFiles(toDir, [
          'lib/.index.bud',
          'lib/.index.js.bud',
          'signature.json',
        ])

        await _rewritePkg(
          toDir,
          ({ devDependencies = {}, peerDependencies = {}, scripts = {} }) => {
            scripts.doc = 'the-script-doc'
            scripts.build = 'the-script-build'
            scripts.test = 'the-script-test'
            scripts.prepare = 'npm run build && npm run doc'
            delete scripts.share
            delete scripts.buid
            devDependencies['@babel/runtime'] =
              demoComponentPkg.devDependencies['@babel/runtime']
            devDependencies['react'] = demoComponentPkg.devDependencies['react']
            devDependencies['react-dom'] =
              demoComponentPkg.devDependencies['react-dom']
            devDependencies['react-router-dom'] =
              demoComponentPkg.devDependencies['react-router-dom']
            if (name !== '@the-/router') {
              devDependencies['@the-/router'] =
                demoComponentPkg.devDependencies['@the-/router']
            }
            peerDependencies['react'] =
              demoComponentPkg.peerDependencies['react']
            peerDependencies['react-dom'] =
              demoComponentPkg.peerDependencies['react-dom']
            return { devDependencies, peerDependencies, scripts }
          },
        )
        {
          await _addDevDeps(toDir, {
            '@the-/script-build': 'file:../script-build',
            '@the-/script-doc': 'file:../script-doc',
            '@the-/script-test': 'file:../script-test',
            '@the-/templates': 'file:../templates',
          })
        }
        await _addDevDeps(toDir, {
          '@the-/ui-demo': 'file:../ui-demo',
          coz: '*',
        })

        for (const testJsx of await aglob('test/*.jsx', { cwd: toDir })) {
          const basename = path.basename(testJsx, '.jsx')
          rename(
            path.resolve(toDir, testJsx),
            path.resolve(toDir, 'test', basename + '.js'),
          )
        }
      }
      if (['lib', 'util', 'mixin', 'const'].includes(kind)) {
        const demoLibDir = path.resolve(baseDir, 'packages', 'demo-lib')
        rimraf.sync(path.resolve(toDir, 'doc/readme'))
        await copyDirAsync(`${demoLibDir}/doc/readme`, `${toDir}/doc/readme`)
        await unlink(path.resolve(toDir, 'lib/.index.bud')).catch(() => null)
        await unlink(path.resolve(toDir, 'shim/esm/index.mjs')).catch(
          () => null,
        )
        await _copyFiles(demoLibDir, toDir, [
          'doc/links.json',
          'doc/overview.md',
          'lib/.index.js.bud',
          'test/.test.js.bud',
          '.README.md.bud',
          '.npmignore',
        ])
        await _rewritePkg(toDir, ({ scripts = {} }) => {
          scripts.doc = 'the-script-doc'
          scripts.build = 'the-script-build'
          scripts.test = 'the-script-test'
          scripts.prepare = 'npm run build && npm run doc'
          delete scripts.share
          delete scripts.buid

          return {
            name: `@the-/${name}`,
            scripts,
          }
        })
      }
    }

    await _removeDevDeps(toDir, [
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
    ])
    await _addDevDeps(toDir, {
      '@the-/script-build': 'file:../script-build',
      '@the-/script-doc': 'file:../script-doc',
      '@the-/script-test': 'file:../script-test',
      '@the-/templates': 'file:../templates',
    })
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
      await _rewritePkg(
        toDir,
        ({ dependencies = {}, devDependencies = {}, scripts = {} }) => {
          for (const [name, ver] of Object.entries(dependencies)) {
            if (/^file/.test(ver)) {
              devDependencies[name] = ver
              delete dependencies[name]
            }
          }
          delete scripts.update
          delete scripts.release
          return {
            author: {
              email: 'okunishinishi@gmail.com',
              name: 'Taka Okunishi',
              url: 'http://okunishitaka.com',
            },
            bugs: {
              url: 'https://github.com/the-labo/the#issues',
            },
            dependencies,
            devDependencies,
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
          }
        },
      )
    }
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
