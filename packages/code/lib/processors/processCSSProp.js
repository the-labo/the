'use strict'

const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')
const { bindCssRange } = require('../helpers/cssHelper')
const parseCSS = require('../parsers/parseCSS')

/**
 * @memberof module:@the-/code.processors
 * @function processCSSProp
 * @param {string} content
 * @returns {Promise<string>} processed
 */
async function processCSSProp(content) {
  return applyConverter(
    content,
    async (content) => {
      const { indexOf, swap } = contentAccess(content)
      const rangeFor = bindCssRange({ indexOf })
      const parsed = await parseCSS(content)
      const declsHash = {}
      parsed.walkDecls((node) => {
        const key = node.parent.type + indexOf(node.parent.source.start)
        declsHash[key] = [...(declsHash[key] || []), node]
      })

      for (const decls of Object.values(declsHash)) {
        const sortedByStart = [...decls].sort(
          (a, b) => indexOf(a.source.start) - indexOf(b.source.start),
        )
        const sortedByName = [...decls].sort((a, b) => {
          const compared = a.prop.localeCompare(b.prop)
          if (compared === 0) {
            return a.value.localeCompare(b.value)
          }

          return compared
        })
        for (let i = 0; i < sortedByStart.length; i++) {
          const byStart = sortedByStart[i]
          const byName = sortedByName[i]
          const byStartRange = rangeFor(byStart)
          const byNameRange = rangeFor(byName)
          if (byStartRange[0] !== byNameRange[0]) {
            const duplicate = byStart.prop === byName.prop
            if (duplicate) {
              continue
            }

            return swap(byStartRange, byNameRange)
          }
        }
      }

      return content
    },
    { name: 'processCSSProp' },
  )
}

module.exports = processCSSProp
