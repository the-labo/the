/**
 * Mixin for writeOnce
 * @function writeOnceMix
 * @param {function} Class
 * @returns {function}
 */
'use strict'

function writeOnceMix(Class) {
  class WriteOnce extends Class {
    destroy() {
      this.throwWriteOnceError('destroy')
    }

    destroyBulk() {
      this.throwWriteOnceError('destroyBulk')
    }

    throwWriteOnceError(operation) {
      const resourceName =
        this.resourceName || this.name || this.constructor.name
      throw new Error(
        `Can not ${operation} on "${resourceName}" because it is marked as write-once`,
      )
    }

    update() {
      this.throwWriteOnceError('update')
    }

    updateBulk() {
      this.throwWriteOnceError('updateBulk')
    }
  }

  return WriteOnce
}

module.exports = writeOnceMix
