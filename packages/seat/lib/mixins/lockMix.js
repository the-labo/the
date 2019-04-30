/**
 * @memberOf module:@the-/seat.mixins
 * @function lockMix
 */
'use strict'

const { delSync, readAsJsonSync, writeAsJsonSync } = require('@the-/util-file')

const LOCK_DURATION = 1500

/** @lends module:@the-/seat.lockMix */
function lockMix(Class) {
  return class LockMixed extends Class {
    isLocked() {
      const { lockFilename } = this
      const info = readAsJsonSync(lockFilename)
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
          throw new Error('[TheSeat] Lock Timeout Occur')
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
}

module.exports = lockMix
