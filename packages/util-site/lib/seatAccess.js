/**
 * Provide seat access functions
 * @memberof module:@the-/util-site
 * @function seatAccess
 * @deprecated Use `the-seat/handy/seatAccess` instead
 * @returns {Object}
 */
'use strict'

/** @lends module:@the-/util-site.seatAccess */
function seatAccess(seat) {
  /**
   * @memberof module:@the-/util-site.seatAccess
   * @inner
   * @name seatAccessBound
   */
  const seatAccessBound = {
    /**
     * Container name for
     * @param {string} name - Name of container
     * @param {number} [bytes=4] - Hom many bytes
     * @returns {string}
     */
    containerNameFor(name, bytes = 4) {
      return [
        name.split('@')[0],
        seat.scope('containers').acquireString(name, { bytes }),
      ].join('-')
    },
    /**
     * Network name for
     * @param {string} name - Name of network
     * @param {number} [bytes=4] - How many bytes for hash
     * @returns {string}
     */
    networkNameFor(name, bytes = 4) {
      return [
        name.split('@')[0],
        seat.scope('networks').acquireString(name, { bytes }),
      ].join('-')
    },
    /**
     * Port number for
     * @param {string} name - Name for seat
     * @param {number} [base=6000] - Base port number
     * @param {number} [increment=1] - Increment amount
     * @returns {*}
     */
    portNumberFor(name, base = 6000, increment = 1) {
      return seat.scope('ports').acquireNumber(name, { base, increment })
    },
    /**
     * Port numbers with range
     * @param {string} name - Name for seat
     * @param {number} [base=22000] - Base port number
     * @param {number} length - Range length
     * @returns {number[]} Min and max number
     */
    portNumberRangeFor(name, base = 22000, length = 100) {
      const scope = seat.scope('ports')
      const min = scope.acquireNumber(name, { base, increment: length })
      const max = min + length
      for (let v = min; v < max; v++) {
        const taken = !scope.canTake(name, v)
        if (taken) {
          throw new Error(
            `[seatAccess] Failed to acquire port ${v} for "${name}" because it already taken`,
          )
        }
      }
      return [min, max]
    },
    /**
     * Process name for
     * @param {string} name - Name for seat
     * @param {number} [bytes=4] - Length of byte for hash
     * @returns {string}
     */
    processNameFor(name, bytes = 4) {
      return [
        name.split('@')[0],
        seat.scope('processes').acquireString(name, { bytes }),
      ].join('-')
    },
    /**
     * Secret value for
     * @param {string} name - Name for seat
     * @param {number} [bytes=12] - Length of byte for hash
     * @returns {string}
     */
    secretFor(name, bytes = 12) {
      return [
        name.split('@')[0],
        seat.scope('secrets').acquireString(name, { bytes }),
      ].join('-')
    },
    /**
     * User name for
     * @param {string} name - Name for seat
     * @param {number} [bytes=4] - Length of byte for hash
     * @returns {string}
     */
    userNameFor(name, bytes = 4) {
      return [
        name.split('@')[0],
        seat.scope('users').acquireString(name, { bytes }),
      ].join('-')
    },
  }
  return seatAccessBound
}

module.exports = seatAccess
