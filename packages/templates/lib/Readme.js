/**
 * Define bud for README.md
 * @memberof module:@the-/templates
 * @function Readme
 * @param {object} config - Configuration.
 * @param {string} config.sections - Section file path.
 * @param {object} config.pkg - Package data.
 * @param {string} config.repo - GitHub Repository name. (eg. 'ape-repo/ap-tmpl')
 * @param {object} config.badges - Badge data.
 * @param {object} config.links - Link urls.
 * @param {string} config.overview - Overview file path.
 * @param {object} config.vars - Custom variables.
 * @returns {object} - Bud object.
 */
'use strict'

const aglob = require('aglob')
const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

const _apiLink = (item) => {
  const { kind, longname, memberof } = item
  let link = longname.replace(':', '_')
  let name = longname.replace(memberof, '')
  switch (kind) {
    case 'function': {
      const { params = [] } = item
      const paramNames = params
        .map((param) => param.name)
        .filter((name) => !/\./.test(name))
      return {
        link,
        memberof,
        name: `${name}(${paramNames.join(',')})`,
      }
    }
    default: {
      return {
        link,
        memberof,
        name,
      }
    }
  }
}

/** @lends module:@the-/templates.readmeBud */
function readmeBud(config = {}) {
  const { api, path: path_ = 'README.md', pkg, repo, sections } = config
  assert.ok(pkg, 'config.pkg is required.')
  assert.ok(sections, 'config.sections is required.')
  assert.ok(repo, 'config.repo is required.')
  return {
    data: {
      api: api && {
        links: api.jsdoc
          .filter(({ kind }) =>
            ['class', 'enum', 'typedef', 'function'].includes(kind),
          )
          .sort((a, b) => {
            return a.longname.localeCompare(b.longname)
          })
          .reduce((reduced, item) => {
            const { memberof = 'global' } = item
            return {
              ...reduced,
              [memberof]: [...(reduced[memberof] || []), _apiLink(item)],
            }
          }, {}),
        path: api.path,
      },
      badges: config.badges,
      banner: config.banner,
      bannerSize: config.bannerSize || 148,
      license: pkg.license === 'UNLICENSED' ? null : pkg.license,
      links: config.links,
      overview: config.overview,
      pkg,
      repo,
      sections: aglob.sync(sections).map((filename) => {
        const name = path.relative(process.cwd(), filename)
        const anchor = name.replace(/[/¥]/g, '-')
        return {
          anchor: path.basename(anchor, path.extname(anchor)),
          filename,
          name,
        }
      }),
      vars: config.vars,
    },
    force: true,
    mkdirp: true,
    mode: '444',
    path: path_,
    tmpl: _tmpl('README.hbs'),
  }
}

module.exports = readmeBud
