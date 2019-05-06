/**
 * @memberof module:@the-/tmp
 * @class TheTmp
 */
'use strict'

const tmp = require('tmp')

/** @lends module:@the-/tmp.TheTmp */
class TheTmp {
  /**
   * Generate tmp directory
   * @param {Object} [options={}] - Optional settings
   * @param {?string} [options.prefix] - Prefix for generated
   * @returns {GenerateDirResult}
   */
  generateDirSync(options = {}) {
    const { prefix } = options
    const { name: filename, removeCallback: cleanup } = tmp.dirSync({
      prefix,
      unsafeCleanup: true,
    })
    return { cleanup, path: filename }
  }

  /**
   * Generate tmp file sync
   * @param {Object} [options={}] - Optional settings
   * @returns {GenerateResult}
   */
  generateSync(options = {}) {
    const { prefix } = options
    const {
      fd: descriptor,
      name: filename,
      removeCallback: cleanup,
    } = tmp.fileSync({ prefix })
    return { cleanup, descriptor, path: filename }
  }

  /**
   * Generate tmp file
   * @param {Object} [options={}] - Optional settings
   * @param {?string} [options.prefix] - Prefix for generated
   * @returns {Promise<GenerateResult>}
   */
  async generate(options = {}) {
    const { prefix } = options
    return new Promise((resolve, reject) => {
      tmp.file({ prefix }, (err, filename, descriptor, cleanup) => {
        if (err) {
          reject(err)
          return
        }
        resolve({ cleanup, descriptor, path: filename })
      })
    })
  }

  /**
   * Generate tmp directory
   * @param {Object} [options={}] - Optional settings
   * @param {?string} [options.prefix] - Prefix for generated
   * @returns {Promise<GenerateDirResult>}
   */
  async generateDir(options = {}) {
    const { prefix } = options
    return new Promise((resolve, reject) => {
      tmp.dir(
        {
          prefix,
          unsafeCleanup: true,
        },
        (err, dirname, cleanup) => {
          if (err) {
            reject(err)
            return
          }
          resolve({ cleanup, path: dirname })
        },
      )
    })
  }

  /**
   * Create and use tmp file until handler resolved (or rejected)
   * @param {function()} handler - Handler function to use tmp file
   * @param {Object} options - Tmp options
   * @returns {Promise<undefined>}
   */
  async while(handler, options = {}) {
    const { cleanup, descriptor, path: filename } = await this.generate(options)
    try {
      await handler(filename, descriptor)
    } finally {
      cleanup()
    }
  }

  /**
   * Create an use tmp directory until handler resolved (or rejected)
   * @param {function()} handler - Handler function to use tmp file
   * @param {Object} options - Tmp options
   * @returns {Promise<undefined>}
   */
  async whileDir(handler, options = {}) {
    const { cleanup, path: dirname } = await this.generateDir(options)
    try {
      await handler(dirname)
    } finally {
      cleanup()
    }
  }
}

module.exports = TheTmp

/**
 * @typedef {Object} GenerateResult
 * @property {Object} descriptor
 * @property {string} path - Filename
 * @property {function()} cleanup
 */
/**
 * @typedef {Object} GenerateDirResult
 * @property {string} path - Directory name
 * @property {function()} cleanup
 */
