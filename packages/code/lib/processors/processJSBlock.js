'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/**
 * @memberof module:@the-/code.processors
 * @function processJSBlock
 * @param {string} content
 * @returns {string} processed
 */
function processJSBlock(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { get, replace } = contentAccess(content)

      const BlockStatementsContainers = [
        parsed.program,
        ...finder.findByTypes(parsed, [NodeTypes.BlockStatement]),
      ].filter(Boolean)

      for (const Container of BlockStatementsContainers) {
        const BlockStatements = (Container.body || []).filter(
          (Node) => Node.type === 'BlockStatement',
        )
        for (const Block of BlockStatements) {
          const declarations = Block.body.filter((Node) =>
            [
              NodeTypes.VariableDeclaration,
              NodeTypes.ClassDeclaration,
              NodeTypes.FunctionDeclaration,
            ].includes(Node.type),
          )
          const redundant = declarations.length === 0
          if (redundant) {
            return replace(
              [Block.start, Block.end],
              get([Block.body[0].start, Block.body[Block.body.length - 1].end]),
            )
          }
        }
      }
      return content
    },
    { name: 'processJSBlock' },
  )
}

module.exports = processJSBlock
