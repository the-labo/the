/**
 * @memberof module:@the-/code.processors
 * @function processJSBlock
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSBlock */
function processJSBlock(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { replace,get } = contentAccess(content)

    const BlockStatementsContainers = [
      parsed.program,
      ...finder.findByTypes(parsed, [NodeTypes.BlockStatement]),
    ].filter(Boolean)

    for (const Container of BlockStatementsContainers) {
      const BlockStatements = (Container.body || []).filter(
        (Node) => Node.type === 'BlockStatement'
      ).filter(
        (Node) => Node.body.length === 1 && Node.body[0].type === 'ExpressionStatement'
      )
      for (const Block of BlockStatements) {
        const [Expression] = Block.body
        const declarations = finder.findByTypes(Block, [
          NodeTypes.VariableDeclaration,
          NodeTypes.ClassDeclaration,
          NodeTypes.FunctionDeclaration,
        ])
        const redundant = declarations.length === 0
        if (redundant) {

          return replace([Block.start, Block.end],
            get([Expression.start, Expression.end])
            )
        }
      }
    }
    return content
  })
}

module.exports = processJSBlock
