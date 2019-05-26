'use strict'
/**
 * Provide seat access functions
 * @function seatAccess
 * @returns {Object}
 */
const theSeat = require('../lib')

/** @lends seatAccess */
function seatAccess() {
  const seat = theSeat()
  return {
    /**
     * Container name for
     * @param {string} name - Name for seat
     * @param {number} [bytes=4] - Byte length for hash
     * @returns {string}
     */
    containerNameFor(name, bytes = 4) {
      const [shortName] = name.split('@')
      return seat.scope('containerNames').acquireString(name, {
        bytes,
        prefix: `${shortName}-`,
      })
    },
    /**
     * Port number for
     * @param {string} name - Name for seat
     * @param {number} [base=6000] - Base port number
     * @param {number} [increment=1] - Increment amount
     * @returns {*}
     */
    portNumberFor(name, base = 6000, increment = 1) {
      return seat.scope('portNumbers').acquireNumber(name, { base, increment })
    },
    /**
     * Port numbers with range
     * @param {string} name - Name for seat
     * @param {number} [base=22000] - Base port number
     * @param {number} length - Range length
     * @returns {number[]} Min and max number
     */
    portNumberRangeFor(name, base = 22000, length = 100) {
      const scope = seat.scope('portNumbers')
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
     * @param {number} [bytes=4] - Byte length for hash
     * @returns {string}
     */
    processNameFor(name, bytes = 4) {
      const [shortName] = name.split('@')
      return seat.scope('processNames').acquireString(name, {
        bytes,
        prefix: `${shortName}-`,
      })
    },
    /**
     * Secret value for
     * @param {string} name - Name for seat
     * @param {number} [bytes=12] - Byte length for hash
     * @returns {string}
     */
    secretFor(name, bytes = 12) {
      return [
        name.split('@')[0],
        seat.scope('secrets').acquireString(name, { bytes }),
      ].join('-')
    },
  }
}

module.exports = seatAccess
