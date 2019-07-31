'use strict'

/**
 * @memberof module:@the-/resize
 * @class TheResize
 * @param {Object} [config] - Configuration
 * @param {string} [config.fit] - Fit policy ('cover','contain','fill', 'inside' or 'outside')
 * @see http://sharp.pixelplumbing.com/en/stable/api-resize/#parameters
 */
const aglob = require('aglob')
const amkdirp = require('amkdirp')
const { statAsync } = require('asfs')
const filecopy = require('filecopy')
const path = require('path')
const sharp = require('sharp')
const { TheTmp } = require('@the-/tmp')
const { fileTypeOf } = require('@the-/util-file')

const imageFilePattern = '**/+(*.jpeg|*.jpg|*.png|*.svg|*.webp)'

/** @lends module:@the-/resize.TheResize */
class TheResize {
  constructor(config = {}) {
    const { enlarge = false, fit = 'inside', height, width } = config
    this.width = width
    this.height = height
    this.enlarge = enlarge
    this.fit = fit
  }

  /**
   * Convert file(s)
   * @param {string} src - Source file name
   * @param {string} dest - Destination file name
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<*>}
   */
  async convert(src, dest, options = {}) {
    const isDir = await statAsync(src)
      .then((state) => state.isDirectory())
      .catch(() => false)
    if (isDir) {
      return this.convertDir(src, dest, options)
    } else {
      return this.convertFile(src, dest, options)
    }
  }

  /**
   * Convert files in a directory
   * @param {string} src - Source directory path
   * @param {string} dest - Destination directory path
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<Array>}
   */
  async convertDir(src, dest, options = {}) {
    const { ignore = [], pattern = imageFilePattern, ...restOptions } = options
    const converted = []
    for (const filename of await aglob(pattern, { cwd: src, ignore })) {
      const srcFile = path.resolve(src, filename)
      const destFile = path.resolve(dest, filename)
      converted.push(await this.convertFile(srcFile, destFile, restOptions))
    }
    return converted
  }

  /**
   * Convert a single file
   * @param {string} src
   * @param {string} dest
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<Object>}
   */
  async convertFile(src, dest, options = {}) {
    const { enlarge, fit, height, width } = this
    await amkdirp(path.dirname(dest))
    const srcStat = await statAsync(src)
    const result = await sharp(src)
      .rotate()
      .resize({
        fit,
        height,
        width,
        withoutEnlargement: !enlarge,
      })
      .toFile(dest)
    const destStat = await statAsync(dest)
    return {
      changed: srcStat.size !== destStat.size,
      filename: path.relative(process.cwd(), path.resolve(dest)),
      format: result.format,
    }
  }

  async isSupported(filename) {
    try {
      const fileType = await fileTypeOf(filename)
      return /^image/.test(fileType.mime)
    } catch (e) {
      return false
    }
  }

  /**
   * Overwrite a file
   * @param {string} filename - Filename to overwrite
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<*>}
   */
  async overwrite(filename, options = {}) {
    const isDir = await statAsync(filename)
      .then((state) => state.isDirectory())
      .catch(() => false)
    if (isDir) {
      return this.overwriteDir(filename, options)
    } else {
      return this.overwriteFile(filename, options)
    }
  }

  /**
   * Overwrite files in a dir
   * @param {string} dirname - Directory name
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<Array>}
   */
  async overwriteDir(dirname, options = {}) {
    const { ignore = [], pattern = imageFilePattern, ...restOptions } = options
    const converted = []
    for (const filename of await aglob(pattern, { cwd: dirname, ignore })) {
      const srcFile = path.resolve(dirname, filename)
      converted.push(await this.overwrite(srcFile, restOptions))
    }
    return converted
  }

  /**
   * Resized a single file
   * @param {string} src
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<*>}
   */
  async overwriteFile(src, options = {}) {
    return new TheTmp().while(async (tmp) => {
      await this.convert(src, tmp)
      await filecopy(tmp, src)
      return src
    })
  }

  /**
   * Overwrite if possible
   * @param {string} filename - Filename to overwrite
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<*>}
   */
  async overwriteIfPossible(filename, options) {
    const isSupported = await this.isSupported(filename).catch(() => false)
    if (!isSupported) {
      return null
    }
    return this.overwrite(filename, options)
  }
}

module.exports = TheResize
