'use strict'

const amkdirp = require('amkdirp')
const fs = require('fs')
const path = require('path')

/**
 * @memberof module:@the-/icon.helpers
 * @namespace writer
 */
const writer = {
  async writerStream(filename, stream) {
    const dirname = path.dirname(filename)
    await amkdirp(dirname)
    await new Promise((resolve, reject) => {
      const out = fs.createWriteStream(filename)
      stream.pipe(out)
      out.on('close', () => resolve())
      out.on('error', (err) => reject(err))
    })
  },
}

module.exports = writer
