#!/usr/bin/env node

'use strict'

const baseDir = `${__dirname}/../..`
const { spawnSync } = require('child_process')
const {EOL} = require('os')
const {
  chmod,
  readFile,
  rename,
  stat,
  unlink,
  writeFile,
} = require('fs').promises

process.chdir(baseDir)

const mapping = {
  'alt':"ui-alt",
  'components':"ui",
  'demo-component':"demo-ui",
  'component-demo':'ui-demo',
  'theme-style':"ui-theme-style",
  'bar':"ui-bar",
  'body':"ui-body",
  'button':"ui-button",
  'caught':"ui-caught",
  'condition':"ui-condition",
  'container':"ui-container",
  'cycle':"ui-cycle",
  'dialog':"ui-dialog",
  'footer':"ui-footer",
  'form':"ui-form",
  'frame':"ui-frame",
  'hamburger':"ui-hamburger",
  'head':"ui-head",
  'header':"ui-header",
  'html':"ui-html",
  'icon':"ui-icon",
  'image':"ui-image",
  'info':"ui-info",
  'input':"ui-input",
  'link':"ui-link",
  'list':"ui-list",
  'main':"ui-main",
  'menu':"ui-menu",
  'meta':"ui-meta",
  'pager':"ui-pager",
  'repeatable':"ui-repeatable",
  'router':"ui-router",
  'route':"ui-route",
  'root':"ui-root",
  'section':"ui-section",
  'spin':"ui-spin",
  'step':"ui-step",
  'style':"ui-style",
  'tab':"ui-tab",
  'flick':"ui-flick",
  'table':"ui-table",
  'toast':"ui-toast",
  'util-component':"util-ui",
  'video':"ui-video",
  'view':"ui-view",
}

const {TheRefactor} = require('@the-/refactor')
const aglob = require('aglob')
const path = require('path')

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

async function main(){
  const refactor = new TheRefactor()
  for(const [from, to] of Object.entries(mapping)){
    const toDir = path.resolve(baseDir, 'packages', to)
    const fromPkgName = `@the-/${from}`
    const toPkgName = `@the-/${to}`
    const toDireExists = !!(await stat(toDir).catch(() => null))
    if(!toDireExists) {
      console.log('Deprecating', fromPkgName)
      spawnSync('npm', ['deprecate', fromPkgName, `moved to "${toPkgName}"`], { cwd: baseDir, stdio: 'inherit' })
      await refactor.renameDir(
        `packages/${from}`,
        `packages/${to}`,
      )
    }



    await _rewritePkg(toDir, () => {
      return {
        name: toPkgName,
        keywords:['the', 'ui'],
      }
    })
    process.chdir(toDir)
    await refactor.rewrite(
      [
        '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/*.js',
        '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/*.jsx',
        '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/.*.bud',
        '*.js',
        '*.jsx',
        '.*.bud',
        '*.json',
      ],
      {
        [`require('${fromPkgName}')`]: [`require('${toPkgName}')`],
        [`require('${fromPkgName}/`]: [`require('${toPkgName}/`],
        [`from '${fromPkgName}'`]: [`from '${toPkgName}'`],
        [`from '${fromPkgName}/`]: [`from '${toPkgName}/`],
        [`: "${fromPkgName}"`]:`: "${toPkgName}"`,
        [`"@the-/component-`+`demo": "file:../component-`+`demo"`]:[`"@the-/ui-demo": "file:../ui-demo"`],
        [`require('@the-/component-`+`demo/markup')`]:`require('@the-/ui-demo/markup')`,
        [`require('@the-/component-`+`demo/mount')`]:`require('@the-/ui-demo/mount')`,
      },
      { cwd: toDir },
    )
    // await unlink(path.resolve(toDir, 'package-lock.json')).catch(() => null)
    if(!/ui-demo/.test(to)){
      // spawnSync('npm', ['i', 'file:../ui-demo','-D'], { cwd: toDir, stdio: 'inherit' })
    }

    // refactor
    {
      process.chdir(toDir)

      const pkgFile = path.resolve(toDir, 'package.json')
      const pkg = JSON.parse(await readFile(pkgFile))
      const {dependencies={}, devDependencies={}} = pkg
      for(const [from, to] of Object.entries(mapping)){
        console.log(`${from} => ${to} in ${toDir}...`)
        const fromPkgName = `@the-/${from}`
        const toPkgName = `@the-/${to}`
        if(fromPkgName in dependencies){
          spawnSync('npm',['un',fromPkgName], { cwd: toDir, stdio: 'inherit' })
          spawnSync('npm',['i', toPkgName], { cwd: toDir, stdio: 'inherit' })
        }
        if(fromPkgName in devDependencies){
          spawnSync('npm',['un',fromPkgName, '-D'], { cwd: toDir, stdio: 'inherit' })
          spawnSync('npm',['i', toPkgName, '-D'], { cwd: toDir, stdio: 'inherit' })
        }
        await refactor.rewrite(
          [
            '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/*.js',
            '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/*.jsx',
            '+(assets|example|bin|lib|client|conf|doc|misc|server|test)/**/.*.bud',
            '*.js',
            '*.jsx',
            '.*.bud',
            '*.json',
          ],
          {
            [`require('${fromPkgName}')`]: [`require('${toPkgName}')`],
            [`require('${fromPkgName}/`]: [`require('${toPkgName}/`],
            [`from '${fromPkgName}'`]: [`from '${toPkgName}'`],
            [`from '${fromPkgName}/`]: [`from '${toPkgName}/`],
            [`: "${fromPkgName}"`]:`: "${toPkgName}"`,
            [`"@the-/component-`+`demo": "file:../component-`+`demo"`]:[`"@the-/ui-demo": "file:../ui-demo"`],
            [`require('@the-/component-`+`demo/markup')`]:`require('@the-/ui-demo/markup')`,
            [`require('@the-/component-`+`demo/mount')`]:`require('@the-/ui-demo/mount')`,
          },
          { cwd: toDir },
        )
      }
    }

    process.chdir(baseDir)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
