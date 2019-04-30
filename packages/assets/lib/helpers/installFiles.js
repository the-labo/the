/**
 * Install files
 * @memberOf module:@the-/assets.helpers
 * @param {string} srcDir - Source directory path
 * @param {string} destDir - Destination directory path
 * @param {Object} [options = {}] - Optional settings
 * @param {boolean} [options.copy=false] - Copy files instead of symlinks
 * @protected
 * @function installFiles
 * @returns {Promise}
 */
'use strict'

const aglob = require('aglob')
const filecopy = require('filecopy')
const filelink = require('filelink')
const { stat } = require('fs')
const path = require('path')

const statAsync = (filename) =>
  new Promise((resolve) => stat(filename, (err, stat) => resolve(!err && stat)))

/** @lends installFiles */
async function installFiles(srcDir, destDir, options = {}) {
  const filenames = await aglob('*.*', { cwd: srcDir })
  for (const filename of filenames) {
    const src = `${srcDir}/${filename}`
    const dest = `${destDir}/${filename}`
    const worker = options && options.copy ? filecopy : filelink
    const before = await statAsync(dest)
    await worker(src, dest, {
      force: true,
      mkdirp: true,
    })
    const after = await statAsync(dest)
    const changed = (before && before.size) !== (after && after.size)
    if (changed) {
      console.log(`File installed: ${path.relative(process.cwd(), dest)}`)
    }
  }
}

module.exports = installFiles
