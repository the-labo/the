'use strict'
/**
 * Find up directory contains path
 * @memberof module:@the-/util-path
 * @function findupDir
 * @param {string} basedir - Base directory
 */
const aglob = require('aglob')
const path = require('path')

/** @lends @the-/util-path.findupDir */
async function findupDir(basedir, options = {}) {
  const { contains = '*.*' } = options
  let dir = basedir
  let parentDir
  while (dir) {
    parentDir = path.dirname(dir)
    const found = await aglob(contains, { cwd: dir })
    if (found.length > 0) {
      return dir
    }
    if (dir === parentDir) {
      return null
    }
    dir = parentDir
  }
  return null
}

findupDir.sync = (basedir, options = {}) => {
  const { contains = '*.*' } = options
  let dir = basedir
  let parentDir
  while (dir) {
    parentDir = path.dirname(dir)
    const found = aglob.sync(contains, { cwd: dir })
    if (found.length > 0) {
      return dir
    }
    if (dir === parentDir) {
      return null
    }
    dir = parentDir
  }
  return null
}

module.exports = findupDir
