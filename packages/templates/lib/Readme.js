/**
 * For README.md
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

/** @lends readmeBud */
function readmeBud(config = {}) {
  const { api, pkg, repo, sections } = config
  assert.ok(pkg, 'config.pkg is required.')
  assert.ok(sections, 'config.sections is required.')
  assert.ok(repo, 'config.repo is required.')
  return {
    data: {
      api: api && {
        jsdoc: api.jsdoc.reduce((reduced, item) => {
          const { kind } = item
          return {
            ...reduced,
            [kind]: [
              ...(reduced.hasOwnProperty(kind) ? reduced[kind] : []),
              item,
            ],
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
        const anchor = name.replace(/[\/\¥]/g, '-')
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
    path: 'README.md',
    tmpl: _tmpl('README.hbs'),
  }
}

module.exports = readmeBud
