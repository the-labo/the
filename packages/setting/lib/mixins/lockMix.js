'use strict'

const { delSync, readAsJsonSync, writeAsJsonSync } = require('@the-/util-file')

const LOCK_DURATION = 1500

/**
 * @memberof module:@the-/setting.mixins
 * @function lockMix
 * @param Class
 * @returns {*}
 */
function lockMix(Class) {
  /**
   * @memberof module:@the-/setting.mixins.lockMix
   * @inner
   */
  class LockMixed extends Class {
    isLocked() {
      const { lockFilename } = this
      let info
      try {
        info = readAsJsonSync(lockFilename)
      } catch (e) {
        return false
      }
      if (!info) {
        return false
      }

      const { at } = info
      return new Date() - new Date(at) < LOCK_DURATION * 2
    }

    lock() {
      const timeoutLimit = new Date().getTime() + LOCK_DURATION
      while (this.isLocked()) {
        if (timeoutLimit < new Date()) {
          throw new Error('[TheSetting] Lock Timeout Occur')
        }
      }
      const { lockFilename } = this
      const { pid } = process
      writeAsJsonSync(lockFilename, { at: new Date().getTime(), pid })
      const info = readAsJsonSync(lockFilename)
      const ok = info && info.pid === pid
      if (!ok) {
        throw new Error('Failed to acquire lock')
      }

      return true
    }

    unlock() {
      const { lockFilename } = this
      return delSync(lockFilename)
    }
  }

  return LockMixed
}

module.exports = lockMix
