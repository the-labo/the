'use strict'

/**
 * Process export statement
 * @memberof module:@the-/code.processors
 * @function processJSExport
 * @param {string} content
 * @returns {string} processed
 */
const {
  parse,
  finder,
  constants: { NodeTypes },
} = require('@the-/ast')
const { EOL } = require('os')
const sortExportNamedDeclarationsOnProgramNode = require('../ast/nodes/sortExportNamedDeclarationsOnProgramNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSExport */
function processJSExport(content, options = {}) {
  function splitExportAndDeclaration(DefaultExport, { get, replace }) {
    const { leadingComments, declaration } = DefaultExport
    if (!declaration.id) {
      return
    }
    const isFunc = declaration.type === NodeTypes.FunctionDeclaration
    if (isFunc) {
      const start = leadingComments
        ? leadingComments[0].start
        : DefaultExport.start
      const end = DefaultExport.end
      const commentCode = leadingComments
        ? get([
            leadingComments[0].start,
            leadingComments[leadingComments.length - 1].end,
          ])
        : ''
      const declarationCode = get(declaration.range)
      return replace(
        [start, end],
        [
          commentCode,
          declarationCode,
          '',
          `export default ${declaration.id.name}`,
        ].join(EOL),
      )
    }
  }

  return applyConverter(content, (content) => {
    const { swap, get, replace } = contentAccess(content)
    const parsed = parse(content, options)
    const converted = sortExportNamedDeclarationsOnProgramNode(parsed.program, {
      swap,
    })
    if (converted) {
      return converted
    }

    const [DefaultExport] = finder.findByTypes(parsed, [
      NodeTypes.ExportDefaultDeclaration,
    ])
    if (DefaultExport) {
      const converted = splitExportAndDeclaration(DefaultExport, {
        get,
        replace,
      })
      if (converted) {
        return converted
      }
    }

    return content
  })
}

module.exports = processJSExport
