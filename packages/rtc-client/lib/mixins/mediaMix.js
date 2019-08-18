'use strict'

const { TheMedia } = require('@the-/media')

/**
 * Mixin for media
 * @memberof module:@the-/rtc.constants.mixins
 * @function mediaMix
 * @param {function()} Class
 * @returns {function()} Class
 */
function mediaMix(Class) {
  class MediaMixed extends Class {
    createMedia(constrains = {}) {
      return new TheMedia(constrains)
    }
  }

  return MediaMixed
}

module.exports = mediaMix
