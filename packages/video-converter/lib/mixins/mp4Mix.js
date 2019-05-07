/**
 * Mixins for mp4
 * @memberof module:@the-/video-converter.mixins
 * @function mp4Mix
 */
'use strict'

const path = require('path')
const theAssert = require('@the-/assert')

/** @lends module:@the-/video-converter..mixins.mp4Mix */
function mp4Mix(Class) {
  const assert = theAssert('TheVideoConverter<MP4Mixed>')

  /**
   * @class MP4Mixed
   * @inner
   * @memberOf module:@the-/video-converter.mixins.mp4Mix
   */
  class MP4Mixed extends Class {
    /**
     * Convert into mp4
     * @param {string} src - Source file name
     * @param {string} dest - Destination file name
     * @param {string} options
     * @returns {Promise<*>}
     */
    async convertIntoMP4(src, dest, options = {}) {
      const { preset = 'veryfast', videoCodec = 'libx264' } = options
      assert(path.extname(dest), '.mp4')
      return this.convert(src, dest, {
        params: ['-y', '-f', 'mp4', '-c:v', videoCodec, '-preset', preset],
      })
    }
  }

  return MP4Mixed
}

module.exports = mp4Mix
