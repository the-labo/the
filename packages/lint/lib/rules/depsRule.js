/**
 * Create "depsRule" lint
 * @function depsRule
 * @param {Object} config - Lint config
 * @returns {function} Lint function
 */
'use strict'

const path = require('path')
const {
  constants: { NodeTypes },
  finder,
  parse,
  walk,
} = require('@the-/ast')

/** @lends depsRule */
function depsRule(config) {
  const { importFrom = false, requireFrom = false, ...rest } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[depsRule] Unknown options`, Object.keys(rest))
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
        return [id]
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
      const FirstArg = node['arguments'][0]
      return FirstArg && FirstArg.value
    }

    if (importFrom) {
      walk.simple(parsed.program, {
        ImportDeclaration: (node) => {
          const modulePaths = modulePathsFor(node.source.value, importFrom)
          const ok = modulePaths.some((modulePath) => canRequire(modulePath))
          let { column, line } = node.loc.start
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

    const CallExpressions = finder.findByTypes(parsed, [
      NodeTypes.CallExpression,
    ])
    const RequireCallNodes = CallExpressions.filter((node) => {
      const arg = node['arguments'][0]
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
      let { column, line } = node.loc.start
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
