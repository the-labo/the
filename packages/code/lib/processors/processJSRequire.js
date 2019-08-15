'use strict'

const path = require('path')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const {
  addExtOnRequireDeclarationArgumentNode,
  cleanupExtOnRequireDeclarationArgumentNode,
  modifyNodeDeprecatedOnRequireDeclaration,
  normalizeSrcPathOnRequireArgumentNode,
} = require('../ast/nodes')
const findRequireDeclarationOnProgramNode = require('../ast/nodes/findRequireDeclarationOnProgramNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')
const { weightModuleName } = require('../helpers/weightHelper')

const isRelative = (filename) => /^\./.test(filename)

/**
 * Process require statement
 * @memberof module:@the-/code.processors
 * @function processJSRequire
 * @param {string} content
 * @returns {string} processed
 */
function processJSRequire(content, options = {}) {
  const { filename, sourceType } = options
  if (sourceType === 'module') {
    return content
  }

  const requireArg = (d) => {
    const declaration = d.declarations && d.declarations[0]
    const call = declaration.init.object || declaration.init
    const args = call && call.arguments
    return args && args[0]
  }

  const requiredName = (d) => {
    const { value } = requireArg(d) || {}
    return value
  }

  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { get, rangeOf, replace, swap } = contentAccess(content)

      const RequireDeclarations = findRequireDeclarationOnProgramNode(
        parsed.program,
      ).filter(
        (Declaration) => Declaration.loc.start.column === 0, // Only top level
      )

      const swapDeclarations = (rangeA, rangeB) => {
        const ranges = [rangeA, rangeB].map((range) => {
          const content = get(range)
          const match = content.match(/\n+;$/)
          if (match) {
            return [range[0], range[1] - match[0].length]
          }

          return range
        })
        return swap(...ranges)
      }

      for (const RequireDeclaration of RequireDeclarations) {
        const converted = modifyNodeDeprecatedOnRequireDeclaration(
          RequireDeclaration,
          {
            get,
            replace,
          },
        )
        if (converted) {
          return converted
        }
      }

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
          return swapDeclarations(rangeOf(byStart), rangeOf(byName))
        }
      }

      // No empty line between require statements
      for (let i = 0; i < sortedByStart.length - 1; i++) {
        const { end: start } = sortedByStart[i]
        const end = sortedByStart[i + 1].start - 1
        if (/^\s+$/.test(content.substring(start, end))) {
          return replace([start, end], '')
        }
      }

      const startsForRequire = RequireDeclarations.map(({ start }) => start)
      const minStartForRequire = Math.min(...startsForRequire)

      const OtherDeclarations = finder
        .findByTypes(parsed, [
          NodeTypes.FunctionDeclaration,
          NodeTypes.VariableDeclaration,
        ])
        .filter(({ start }) => !startsForRequire.includes(start))
        .filter(({ start }) => start > minStartForRequire)
        .sort((a, b) => b.start - a.start)

      for (const Declaration of OtherDeclarations) {
        const Require = sortedByStart[sortedByStart.length - 1]
        if (Require && Declaration.start < Require.start) {
          return swapDeclarations(
            [Declaration.start, Declaration.end],
            [Require.start, Require.end],
          )
        }
      }
      if (filename) {
        const dirname = path.dirname(filename)
        for (const RequireDeclaration of RequireDeclarations) {
          const ArgumentNode = requireArg(RequireDeclaration)
          if (!ArgumentNode) {
            continue
          }
          const { type, value } = ArgumentNode
          if (type !== NodeTypes.StringLiteral) {
            continue
          }

          if (!isRelative(value)) {
            continue
          }

          const extChanged =
            cleanupExtOnRequireDeclarationArgumentNode(ArgumentNode, {
              extToRemove: ['.js', '.jsx'],
              get,
              replace,
            }) ||
            addExtOnRequireDeclarationArgumentNode(ArgumentNode, {
              dirname,
              extToAdd: ['.json'],
              get,
              replace,
            })
          if (extChanged) {
            return extChanged
          }

          const normalized = normalizeSrcPathOnRequireArgumentNode(
            ArgumentNode,
            {
              dirname,
              replace,
            },
          )
          if (normalized) {
            return normalized
          }
        }
      }

      return content
    },
    { name: 'processJSRequire' },
  )
}

module.exports = processJSRequire
