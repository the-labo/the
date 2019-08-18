'use strict'

const { mkdirpAsync, unlinkAsync } = require('asfs')
const { exec, spawn } = require('child_process')
const path = require('path')
const theAssert = require('@the-/assert')
const ffmpeg = require('./helpers/ffmpeg')
const ffprobe = require('./helpers/ffprobe')
const filenameFor = require('./helpers/filenameFor')
const isVideoSrc = require('./helpers/isVideoSrc')
const mp4Mix = require('./mixins/mp4Mix')

const assert = theAssert('TheVideoConverter')

const TheVideoConverterBase = [mp4Mix].reduce((C, mix) => mix(C), class Base {})

/**
 * Video converter
 * @memberof module:@the-/video-converter
 * @class TheVideoConverter
 * @augments module:@the-/video-converter.mixins.mp4Mix~MP4Mixed
 */
class TheVideoConverter extends TheVideoConverterBase {
  /**
   * Detect
   * @param {string} src
   * @returns {boolean}
   */
  isVideoSrc(src) {
    return isVideoSrc(src)
  }

  /**
   * Convert video files
   * @param {string} src - Source file name
   * @param {string} dest - Destination file name
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<*>}
   */
  async convert(src, dest, options = {}) {
    const { logLevel = 'panic', params = [] } = options
    await mkdirpAsync(path.dirname(dest))
    return new Promise((resolve, reject) => {
      const spawned = spawn(
        ffmpeg.path,
        [
          '-hide_banner',
          '-y',
          '-loglevel',
          logLevel,
          '-i',
          src,
          ...params,
          dest,
        ],
        {
          stdio: 'inherit',
        },
      )
      spawned.on('error', (err) => reject(err))
      spawned.on('close', () => {
        resolve()
      })
    })
  }

  /**
   * Inspect file
   * @param {string} filename
   * @param {Object} [options={}] - Optional setting
   * @returns {Promise<*>}
   */
  async inspect(filename, options = {}) {
    const { logLevel = 'error' } = options
    assert(filename)
    return new Promise((resolve, reject) => {
      exec(
        `${ffprobe.path} -show_streams -pretty -v ${logLevel} -print_format json "${filename}"`,
        (err, stdout, stderror) => {
          if (err) {
            console.error(stderror)
            reject(err)
            return
          }

          resolve(JSON.parse(stdout))
        },
      )
    })
  }

  /**
   * Convert video file if needed
   * @param {string} src
   * @param {Object} [options={}]
   * @param {boolean} [options.cleanup=false] - Cleanup original file if needed
   * @param {boolean} [options.onlyIfNeeded=false] - Convert only if needed
   * @returns {Promise<string>}
   */
  async process(src, options = {}) {
    const { cleanup = false, onlyIfNeeded = false } = options
    if (!isVideoSrc(src)) {
      return src
    }

    if (onlyIfNeeded) {
      const needsToProcess = await this._needsToProcess(src)
      if (!needsToProcess) {
        return src
      }
    }

    const dest = filenameFor(src, {
      extname: '.mp4',
      suffix: '-processed',
    })
    await this.convertIntoMP4(src, dest, {})
    if (cleanup) {
      await unlinkAsync(src)
    }

    return dest
  }

  async processIfNeeded(filename, options) {
    const isVideoSrc = this.isVideoSrc(filename)
    if (!isVideoSrc) {
      return filename
    }

    return this.process(filename, options)
  }

  async _needsToProcess(src) {
    const info = await this.inspect(src)
    const isH264 = info.streams
      .filter((stream) => stream.codec_type === 'video')
      .every((stream) => stream.codec_name === 'h264')
    return !isH264
  }
}

module.exports = TheVideoConverter
