/**
 * Process require statement
 * @memberOf module:the-code/lib/processors
 * @function processJSRequire
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const path = require('path')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('the-ast')
const {
  cleanupExtOnRequireDeclarationArgumentNode,
  normalizeSrcPathOnRequireArgumentNode,
} = require('../ast/nodes')
const findRequireDeclarationOnProgramNode = require('../ast/nodes/findRequireDeclarationOnProgramNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')
const { weightModuleName } = require('../helpers/weightHelper')

const isRelative = (filename) => /^\./.test(filename)

/** @lends processJSRequire */
function processJSRequire(content, options = {}) {
  const { filename, sourceType } = options
  if (sourceType === 'module') {
    return content
  }

  const requireArg = (d) => {
    const declaration = d.declarations && d.declarations[0]
    const call = declaration.init.object || declaration.init
    const args = call && call['arguments']
    return args && args[0]
  }

  const requiredName = (d) => {
    const { value } = requireArg(d) || {}
    return value
  }

  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { rangeOf, replace, swap } = contentAccess(content)

    const RequireDeclarations = findRequireDeclarationOnProgramNode(
      parsed.program,
    ).filter((Declaration) => {
      return Declaration.loc.start.column === 0 // Only top level
    })

    const sortedByStart = [...RequireDeclarations].sort(
      (a, b) => a.start - b.start,
    )
    const sortedByName = [...RequireDeclarations].sort((a, b) => {
      const aName = requiredName(a)
      const bName = requiredName(b)
      const aWeight = weightModuleName(aName)
      const bWeight = weightModuleName(bName)
      if (aWeight !== bWeight) {
        return aWeight - bWeight
      }
      return aName.localeCompare(bName)
    })
    for (let i = 0; i < sortedByStart.length; i++) {
      const byStart = sortedByStart[i]
      const byName = sortedByName[i]
      if (byStart.start !== byName.start) {
        return swap(rangeOf(byStart), rangeOf(byName))
      }
    }

    // No empty line between require statements
    for (let i = 0; i < sortedByStart.length - 1; i++) {
      const start = sortedByStart[i].end
      const end = sortedByStart[i + 1].start - 1
      if (/^\s+$/.test(content.substring(start, end))) {
        return replace([start, end], '')
      }
    }

    const startsForRequire = RequireDeclarations.map(({ start }) => start)

    const OtherDeclarations = finder
      .findByTypes(parsed, [
        NodeTypes.FunctionDeclaration,
        NodeTypes.VariableDeclaration,
      ])
      .filter(({ start }) => !startsForRequire.includes(start))

    for (const Declaration of OtherDeclarations.sort(
      (a, b) => b.start - a.start,
    )) {
      const Require = sortedByStart[sortedByStart.length - 1]
      if (Require && Declaration.start < Require.start) {
        return swap(
          [Declaration.start, Declaration.end],
          [Require.start, Require.end],
        )
      }
    }

    if (filename) {
      const dirname = path.dirname(filename)
      const extToRemove = /\.js$|\.json$/
      for (const RequireDeclaration of RequireDeclarations) {
        const ArgumentNode = requireArg(RequireDeclaration)
        if (!ArgumentNode) {
          continue
        }
        if (ArgumentNode.type !== 'StringLiteral') {
          continue
        }
        const value = ArgumentNode.value
        if (!isRelative(value)) {
          continue
        }
        const extRemoved = cleanupExtOnRequireDeclarationArgumentNode(
          ArgumentNode,
          {
            extToRemove,
            replace,
          },
        )
        if (extRemoved) {
          return extRemoved
        }

        const normalized = normalizeSrcPathOnRequireArgumentNode(ArgumentNode, {
          dirname,
          replace,
        })
        if (normalized) {
          return normalized
        }
      }
    }
    return content
  })
}

module.exports = processJSRequire
