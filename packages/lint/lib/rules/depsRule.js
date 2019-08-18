'use strict'

const path = require('path')
const {
  constants: { NodeTypes },
  finder,
  parse,
  walk,
} = require('@the-/ast')
const { parsePattern } = require('../helpers/parseHelper')

/**
 * Create "depsRule" lint
 * @memberof module:@the-/lint.rules
 * @function depsRule
 * @param {Object} config - Lint config
 * @returns {function()} Lint function
 */
function depsRule(config) {
  const {
    forbidImportFrom = null,
    importFrom = false,
    requireFrom = false,
    ...rest
  } = config
  if (Object.keys(rest).length > 0) {
    console.warn('[depsRule] Unknown options', Object.keys(rest))
  }

  return async function depsRuleCheck({ content, filename, report }) {
    const parsed = parse(String(content), {
      sourceType: 'unambiguous',
    })

    const modulePathsFor = (id, ext) => {
      if (/^\./.test(id)) {
        const resolved = path.resolve(path.dirname(filename), id)
        return [
          resolved,
          ...[].concat(ext).map((ext) => resolved + ext),
          ...ext.map((ext) => path.join(resolved, 'index') + ext),
        ]
      } else {
        return [id, path.join(process.cwd(), 'node_modules', id)]
      }
    }

    const canRequire = (id) => {
      try {
        return !!require.resolve(id)
      } catch (e) {
        return false
      }
    }

    const requiredName = (node) => {
      const {
        arguments: [FirstArg],
      } = node
      return FirstArg && FirstArg.value
    }

    if (importFrom) {
      walk.simple(parsed.program, {
        ImportDeclaration: (node) => {
          const modulePaths = modulePathsFor(node.source.value, importFrom)
          const ok = modulePaths.some((modulePath) => canRequire(modulePath))
          const {
            loc: {
              start: { column, line },
            },
          } = node
          !ok &&
            report('Module not found', {
              actual: false,
              code: String(content).substring(node.start, node.end),
              expect: true,
              loc: { column, line },
              module: node.source.value,
              where: path.resolve(filename),
            })
        },
      })
    }

    if (forbidImportFrom) {
      const patterns = []
        .concat(forbidImportFrom)
        .filter(Boolean)
        .map((pattern) => parsePattern(pattern))
      walk.simple(parsed.program, {
        ImportDeclaration: (node) => {
          const {
            loc: {
              start: { column, line },
            },
            source: { value: from },
          } = node

          const ok = []
            .concat(patterns)
            .every((pattern) => !from.match(pattern))
          !ok &&
            report('Invalid import from', {
              actual: from,
              expect: patterns,
              loc: { column, line },
              where: path.resolve(filename),
            })
        },
      })
    }

    const CallExpressions = finder.findByTypes(parsed, [
      NodeTypes.CallExpression,
    ])
    const RequireCallNodes = CallExpressions.filter((node) => {
      const {
        arguments: [arg],
      } = node
      return (
        node.callee.name === 'require' &&
        arg &&
        arg.type === NodeTypes.StringLiteral
      )
    })
    for (const node of RequireCallNodes) {
      const name = requiredName(node)
      const modulePaths = modulePathsFor(name, requireFrom)
      const ok = modulePaths.some((modulePath) => canRequire(modulePath))
      const {
        loc: {
          start: { column, line },
        },
      } = node
      !ok &&
        report('Module not found', {
          actual: false,
          code: String(content).substring(node.start, node.end),
          expect: true,
          loc: { column, line },
          module: name,
          where: path.resolve(filename),
        })
    }
  }
}

module.exports = depsRule
