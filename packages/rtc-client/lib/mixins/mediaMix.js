'use strict'

/**
 * Mixin for media
 * @memberof module:@the-/rtc.constants.mixins
 * @function mediaMix
 * @param {function()} Class
 * @returns {function()} Class
 */
const { TheMedia } = require('@the-/media')

/** @lends module:@the-/rtc.constants.mixins.mediaMix */
function mediaMix(Class) {
  class MediaMixed extends Class {
    createMedia(constrains = {}) {
      return new TheMedia(constrains)
    }
  }

  return MediaMixed
}

module.exports = mediaMix
