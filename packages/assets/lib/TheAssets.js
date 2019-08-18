'use strict'

const installFiles = require('./helpers/installFiles')

const assetDir = `${__dirname}/../assets`

/**
 * @memberof module:@the-/assets
 * @class TheAssets
 */
class TheAssets {
  /**
   * Install assets into directory
   * @param {string} dirname - Directory name install into
   * @param {Object} [options = {}] - Optional settings
   * @param {boolean} [options.copy=false] - Copy files instead of symlinks
   * @returns {Promise}
   */
  async installTo(dirname, options = {}) {
    const { copy = false } = options
    await installFiles(`${assetDir}/font-awesome/css`, `${dirname}/css`, {
      copy,
    })
    await installFiles(`${assetDir}/normalize/css`, `${dirname}/css`, { copy })
    await installFiles(`${assetDir}/flatpickr`, `${dirname}/css`, { copy })
    await installFiles(
      `${assetDir}/font-awesome/webfonts`,
      `${dirname}/webfonts`,
      { copy },
    )
    await installFiles(`${assetDir}/shims`, `${dirname}/js`, { copy })
  }
}

module.exports = TheAssets
