/**
 * @memberof module:@the-/code.processors
 * @function processCSSRule
 * @param {string} content
 * @returns {Promise.<string>} processed
 */
'use strict'

const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')
const { bindCssRange } = require('../helpers/cssHelper')
const parseCSS = require('../parsers/parseCSS')

/** @lends module:@the-/code.processors.processCSSRule */
async function processCSSRule(content) {
  function weightSelector(selector) {
    let weight = 0
    if (/^&/.test(selector)) {
      weight -= 100
    }
    if (/^&:/.test(selector)) {
      weight -= 100
    }
    if (/^&:global/.test(selector)) {
      weight += 100
    }
    if (/^& /.test(selector)) {
      weight += 100
    }
    return weight
  }

  return applyConverter(content, async (content) => {
    const { indexOf, swap } = contentAccess(content)

    const parsed = await parseCSS(content)
    const rangeFor = bindCssRange({ indexOf })

    const comments = []
    const rulesHash = {}
    parsed.walkComments((comment) => comments.push(comment))
    parsed.walkRules((node) => {
      const key = node.parent.type + indexOf(node.parent.source.start)
      rulesHash[key] = [...(rulesHash[key] || []), node]
    })
    for (const rules of Object.values(rulesHash)) {
      const sortedByStart = [...rules].sort((a, b) => {
        return indexOf(a.source.start) - indexOf(b.source.start)
      })
      const sortedByName = [...rules].sort((a, b) => {
        const aWeight = weightSelector(a.selector)
        const bWeight = weightSelector(b.selector)
        if (aWeight !== bWeight) {
          return aWeight - bWeight
        }
        return a.selector.localeCompare(b.selector)
      })
      for (let i = 0; i < sortedByStart.length; i++) {
        const byStart = sortedByStart[i]
        const byName = sortedByName[i]
        const byStartRange = rangeFor(byStart)
        const byNameRange = rangeFor(byName)
        if (byStartRange[0] !== byNameRange[0]) {
          return swap(byStartRange, byNameRange)
        }
      }
    }
    return content
  })
}

module.exports = processCSSRule
