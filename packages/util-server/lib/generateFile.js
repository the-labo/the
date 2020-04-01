'use strict'

const amkdirp = require('amkdirp')
const fs = require('fs')
const path = require('path')

/**
 * Write from chunk generator function
 * @function generateFile
 * @param {string} filename - Filename to write
 * @param {function()} generator - Chunk data generator
 * @returns {Promise<undefined>}
 */
async function generateFile(filename, generator) {
  if (typeof generator === 'function') {
    generator = generator()
  }

  await amkdirp(path.dirname(filename))
  await new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filename)
    stream.on('finish', () => resolve())
    stream.on('error', (e) => reject(e))
    void (async function () {
      for await (const chunk of generator) {
        stream.write(chunk)
      }
      stream.end()
    })()
  })
  return { filename }
}

module.exports = generateFile
