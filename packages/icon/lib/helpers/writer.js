'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

/**
 * @memberof module:@the-/icon.helpers
 * @namespace writer
 */
const writer = {
  async writerStream(filename, stream) {
    const dirname = path.dirname(filename)
    await mkdirp(dirname)
    await new Promise((resolve, reject) => {
      const out = fs.createWriteStream(filename)
      stream.pipe(out)
      out.on('close', () => resolve())
      out.on('error', (err) => reject(err))
    })
  },
}

module.exports = writer
