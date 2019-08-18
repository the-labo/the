'use strict'

const fs = require('fs')
const path = require('path')

const exists = (filename) => {
  try {
    fs.statSync(filename)
    return true
  } catch (e) {
    return false
  }
}

const resolveRequirePath = (dirname, requirePath, extToAdd) => {
  for (const extname of extToAdd) {
    const resolved = path.resolve(dirname, requirePath + extname)
    if (exists(resolved)) {
      return resolved
    }
  }
  return null
}

/**
 * @memberof module:@the-/code.ast.nodes
 * @function addExtOnRequireDeclarationArgumentNode
 * @returns {*}
 */
function addExtOnRequireDeclarationArgumentNode(
  ArgumentNode,
  { dirname, extToAdd, replace },
) {
  const resolved = resolveRequirePath(dirname, ArgumentNode.value, extToAdd)
  if (!resolved) {
    return
  }
  const extname = path.extname(resolved)
  const shouldExt = extToAdd.includes(extname)
  if (shouldExt) {
    return replace(
      [ArgumentNode.start + 1, ArgumentNode.end - 1],
      ArgumentNode.value.replace(extname, '') + extname,
    )
  }
}

module.exports = addExtOnRequireDeclarationArgumentNode
