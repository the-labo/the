/**
 * Pipe to file
 * @function pipeToFile
 * @param {Stream} src - Input file stream
 * @param {string} dest - Destination file path
 * @returns {Promise}
 */
'use strict'

const amkdirp = require('amkdirp')
const fs = require('fs')
const path = require('path')

/** @lends pipeToFile */
async function pipeToFile(src, dest) {
  if (typeof src === 'string') {
    src = fs.createReadStream(src)
  }
  await amkdirp(path.dirname(dest))
  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(dest)
    src.pipe(w)
    w.on('error', (e) => reject(e))
    w.on('close', () => resolve())
  })
  return dest
}

module.exports = pipeToFile
