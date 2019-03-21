/**
 * Define content access methods
 * @memberOf module:the-code/lib/helpers
 * @function contentAccess
 */
'use strict'

const { EOL } = require('os')
const debug = require('debug')('the:code:contentAccess')

/** @lends contentAccess */
function contentAccess(content) {
  const contentLines = content.split(EOL)
  return {
    enclosedRange: (range, options = {}) => {
      const { left = '(', right = ')' } = options
      let leftIndex = range[0]
      while (leftIndex >= 0) {
        const hit = content.substr(leftIndex, left.length) === left
        if (hit) {
          break
        }
        leftIndex--
      }
      let rightIndex = range[1]
      while (rightIndex <= content.length) {
        const hit = content.substr(rightIndex, right.length) === right
        if (hit) {
          break
        }
        rightIndex++
      }
      return [leftIndex, rightIndex + 1]
    },
    get: (range) => {
      const [start, end] = range
      return content.substring(start, end)
    },
    indexOf: ({ column, line }) => {
      return (
        [...contentLines]
          .splice(0, line - 1)
          .reduce((i, { length }) => i + length + EOL.length, 0) +
        column -
        1
      )
    },
    rangeOf: (declaration) => {
      let { end, loc, start, trailingComments } = declaration
      const comments = (trailingComments || []).filter(
        (comment) => comment.loc.start.line === loc.end.line,
      )
      for (const comment of comments) {
        end = comment.end
      }
      return [start, end]
    },
    remove: (range) => {
      const [start, end] = range
      const removed = [
        content.substring(0, start),
        content.substring(end, content.length),
      ].join('')
      debug('removed', removed)
      return removed
    },
    replace: (range, replacing) => {
      const [start, end] = range
      const replaced = [
        content.substring(0, start),
        replacing,
        content.substring(end, content.length),
      ].join('')
      debug('replaced', replaced)
      if (content === replaced) {
        throw new Error(
          `[TheCode] Invalid replacing: ${range} with ${JSON.stringify(
            replacing,
          )}`,
        )
      }
      return replaced
    },
    swap: (range1, range2) => {
      const [first, second] = [range1, range2].sort((a, b) => a[0] - b[0])
      const swapped = [
        content.substring(0, first[0]),
        content.substring(second[0], second[1]),
        content.substring(first[1], second[0]),
        content.substring(first[0], first[1]),
        content.substring(second[1], content.length),
      ].join('')
      debug('swapped', swapped)
      return swapped
    },
  }
}

module.exports = contentAccess
