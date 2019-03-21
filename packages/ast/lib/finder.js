/**
 * Find node from node
 * @module finder
 */
'use strict'

const walk = require('./walk')

const finder = Object.freeze(
  /** @lends finder */
  {
    /**
     * Find nodes by types
     * @param {Node} node
     * @param {string[]} types
     * @returns {Node[]} Found nodes
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
