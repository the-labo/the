/**
 * Define a bud for README.md
 * @function Readme
 * @param {object} config - Configuration.
 * @param {string} config.sections - Section file path.
 * @param {object} config.pkg - Package data.
 * @param {string} config.repo - GitHub Repository name. (eg. 'ape-repo/ap-tmpl')
 * @param {object} config.badges - Badge data.
 * @param {boolean} [config.badges.travis=false] - Should show travis badge.
 * @param {boolean} [config.badges.codeclimate=false] - Should show codeclimate badge.
 * @param {boolean} [config.badges.codeclimateCoverage=false] - Should show codeclimate coverage badge.
 * @param {boolean} [config.badges.gemnasium=false] - Should show gemnasium badge.
 * @param {boolean} [config.badges.npm=false] - Should show npm badge.
 * @param {boolean} [config.badges.bower=false] - Should show bower badge.
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
  const { pkg, repo, sections } = config
  assert.ok(pkg, 'config.pkg is required.')
  assert.ok(sections, 'config.sections is required.')
  assert.ok(repo, 'config.repo is required.')
  return {
    data: {
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
