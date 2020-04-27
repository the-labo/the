'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

/**
 * Pipe to file
 * @function pipeToFile
 * @param {Stream} src - Input file stream
 * @param {string} dest - Destination file path
 * @returns {Promise}
 */
async function pipeToFile(src, dest) {
  if (typeof src === 'string') {
    src = fs.createReadStream(src)
  }

  await mkdirp(path.dirname(dest))
  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(dest)
    src.pipe(w)
    w.on('error', (e) => reject(e))
    w.on('close', () => resolve())
  })
  return dest
}

module.exports = pipeToFile
