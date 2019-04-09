/**
 * Mixin for media
 * @function mediaMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const { TheMedia } = require('@the-/media')

/** @lends mediaMix */
function mediaMix(Class) {
  class MediaMixed extends Class {
    createMedia(constrains = {}) {
      return new TheMedia(constrains)
    }
  }

  return MediaMixed
}

module.exports = mediaMix
