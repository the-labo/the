'use strict'

const path = require('path')

const isRelative = (filename) => /^\.\/|^\.\./.test(filename)

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeSrcPathOnRequireArgumentNode
 * @returns {*}
 */
function normalizeSrcPathOnRequireArgumentNode(
  ArgumentNode,
  { dirname, replace },
) {
  if (!dirname) {
    return null
  }

  const { value } = ArgumentNode
  const resolved = path.resolve(dirname, value)
  const normalized = path.relative(dirname, resolved)
  if (normalized === value) {
    return
  }

  const replacing = isRelative(normalized) ? normalized : `./${normalized}`
  if (replacing === value) {
    return
  }

  return replace([ArgumentNode.start + 1, ArgumentNode.end - 1], replacing)
}

module.exports = normalizeSrcPathOnRequireArgumentNode
