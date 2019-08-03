'use strict'

module.exports = Object.freeze({
  bindCssRange({ indexOf }) {
    return function rangeFor(node) {
      const { parent, source, type } = node
      const start = indexOf(source.start)
      const end = indexOf(source.end)
      const range = [start, end]

      for (let i = 0; i < parent.nodes.length; i++) {
        const child = parent.nodes[i]
        const hit = child.type === type && start === indexOf(child.source.start)
        if (hit) {
          for (let j = i - 1; j >= 0; j--) {
            const before = parent.nodes[j]
            if (before.type !== 'comment') {
              break
            }

            range[0] = indexOf(before.source.start)
          }
        }
      }
      return range
    }
  },
})
