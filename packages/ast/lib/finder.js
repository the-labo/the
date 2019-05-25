'use strict'
/**
 * Find node from node
 * @memberof module:@the-/ast
 * @namespace finder
 */
const walk = require('./walk')

const finder = Object.freeze(
  /** @lends module:@the-/ast.finder */
  {
    /**
     * Find nodes by types
     * @param {Object} node
     * @param {string[]} types
     * @returns {Object[]} Found nodes
     */
    findByTypes: (node, types) => {
      const found = []
      walk.simple(
        node,
        types.reduce(
          (reduced, type) => ({
            ...reduced,
            [type]: (node) => {
              found.push(node)
            },
          }),
          {},
        ),
      )
      return found
    },
    findLastElement: (node) => {
      const { elements } = node
      const lastElement = [...elements].reverse()[0]
      return lastElement || null
    },
  },
)

module.exports = finder
