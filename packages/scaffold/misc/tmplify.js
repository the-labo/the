#!/usr/bin/env node
'use strict'

/**
 * Tmplify prototype.
 */
process.chdir(`${__dirname}/..`)

const { cleanup } = require('asobj')
const filemode = require('filemode')
const fs = require('fs')
const path = require('path')
const tmplconv = require('tmplconv')
const demos = require('../demos')

const prefix = '~~~~'
const suffix = '~~~~'

async function tmplify() {
  for (const type of Object.keys(demos)) {
    const demoName = demos[type]
    const demoDir = path.dirname(require.resolve(`${demoName}/package.json`))
    const demoPkg = require(`${demoName}/package.json`)
    const tmplDir = `assets/tmpl/${type}`
    await tmplconv.tmplify(demoDir, tmplDir, {
      clean: true,
      data: cleanup(
        {
          author_email: demoPkg.author.email,
          author_name: demoPkg.author.name,
          author_url: demoPkg.author.url,
          github_repository: (demoPkg.repository.url || '')
            .split(/\//g)
            .slice(-2)
            .join('/')
            .replace(/\.git$/, ''),
          package_description: demoPkg.description,
          package_name: demoPkg.name,
          package_unscoped_name: demoPkg.name
            .replace(/@/, '')
            .replace('/', '')
            .replace('--', '-'),
          ...(require('../lib/data')[type] || {}),
        },
        { delEmptyString: true, delNull: true },
      ),
      ignore: [
        '.DS_Store',
        '.svg',
        'ci/demo.js',
        'node_modules/**/*.*',
        '.idea/**/*.*',
        '.idea',
        '**/*.map',
      ],
      mode: '444',
      pattern: [
        '**/*.*',
        '.*',
        '.*.bud',
        '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/.*.bud',
        '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/**/.*.bud',
        '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/.*.hbs',
        '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/**/.*.hbs',
      ],
      prefix,
      suffix,
    })
    await tmplconv.tmplify(`${__dirname}/..`, tmplDir, {
      pattern: ['.gitignore'],
      prefix,
      suffix,
    })

    // Modify package.json
    {
      const filename = `${tmplDir}/package.json.tmpl`
      const str = fs.readFileSync(filename).toString()
      const pkg = JSON.parse(str)
      fs.chmodSync(filename, '644')
      const newPkg = {
        author: pkg.author,
        bin: pkg.bin,
        browser: pkg.browser,
        bugs: pkg.bugs,
        dependencies: pkg.dependencies,
        description: pkg.description,
        devDependencies: pkg.devDependencies,
        engines: pkg.engines,
        homepage: pkg.homepage,
        keywords: pkg.keywords,
        license: pkg.license,
        main: pkg.main,
        name: pkg.name,
        peerDependencies: pkg.peerDependencies,
        publishConfig: pkg.publishConfig,
        repository: (pkg.repository.url || '')
          .split(/\//g)
          .slice(-1)
          .join('/')
          .replace(/\.git$/, ''),
        scripts: pkg.scripts,
        version: '1.0.0',
      }
      for (const name of Object.keys(newPkg)) {
        if (!newPkg[name]) {
          delete newPkg[name]
        }
      }
      fs.writeFileSync(filename, JSON.stringify(newPkg, null, 2))
      await filemode(filename, '444')
    }
  }
}

void tmplify().catch((e) => {
  console.error(e)
  process.exit(1)
})
