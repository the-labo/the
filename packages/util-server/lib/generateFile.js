/**
 * Write from chunk generator function
 * @function generateFile
 * @param {string} filename - Filename to write
 * @param {function} generator - Chunk data generator
 * @returns {Promise.<void>}
 */
'use strict'

const amkdirp = require('amkdirp')
const fs = require('fs')
const path = require('path')

/** @lend generateFile */
async function generateFile (filename, generator) {
  if (typeof generator === 'function') {
    generator = generator()
  }
  await amkdirp(path.dirname(filename))
  await new Promise(async (resolve, reject) => {
    const stream = fs.createWriteStream(filename)
    stream.on('finish', () => resolve())
    stream.on('error', (e) => reject(e))
    for await (const chunk of generator) {
      stream.write(chunk)
    }
    stream.end()
  })
  return { filename }
}

module.exports = generateFile
