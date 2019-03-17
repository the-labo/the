/**
 * @function toc
 */
'use strict'

const fs = require('fs')
const generator = require('markdown-toc')

/** @lends toc */
function toc(config) {
  const { exclude = [/Table of Contents/], src } = config

  return {
    data: {
      src: fs.readFileSync(src).toString(),
    },
    force: true,
    mode: '444',
    tmpl(data) {
      const { src } = data
      return generator(src, {
        filter(line) {
          const rejectPatterns = exclude
          for (const pattern of rejectPatterns) {
            if (pattern.test(line)) {
              return false
            }
          }
          return true
        },
      }).content.toString()
    },
  }
}

module.exports = toc
