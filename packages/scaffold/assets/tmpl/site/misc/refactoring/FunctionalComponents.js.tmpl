#!/usr/bin/env node
'use strict'

process.chdir(`${__dirname}/../..`)

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const { TheRefactor } = require('@the-/refactor')

async function main() {
  await new TheRefactor().convert('client/ui/**/*.jsx', (content) => {
    const parsed = parse(content)
    const ClassDeclarations = finder.findByTypes(parsed, [
      NodeTypes.ClassDeclaration,
    ])
    const ComponentClasses = ClassDeclarations.filter((Class) => {
      const name =
        Class.superClass &&
        Class.superClass.property &&
        Class.superClass.property.name
      return ['Component', 'PureComponent'].includes(name)
    })
    for (const ClassDeclaration of ComponentClasses) {
      const {
        body: { body },
      } = ClassDeclaration
      const stateMethods = body.filter(
        (b) =>
          b.type === NodeTypes.ClassPrivateProperty &&
          ['stateful', 'stateless'].includes(b.key.id && b.key.id.name),
      )
      const renderMethod = body.find(
        (b) =>
          b.type === NodeTypes.ClassMethod &&
          (b.key && b.key.name === 'render'),
      )
      if (!renderMethod) {
        continue
      }

      if (stateMethods.length !== body.length - 1) {
        continue
      }

      {
        const thisDestructuring = finder
          .findByTypes(renderMethod.body, [NodeTypes.VariableDeclaration])
          .find((V) => {
            const {
              declarations: [d0],
            } = V
            return d0 && d0.init && d0.init.type === NodeTypes.ThisExpression
          })
        const propsValues =
          thisDestructuring &&
          finder
            .findByTypes((thisDestructuring.declarations || [])[0], [
              NodeTypes.ObjectProperty,
            ])
            .find((P) => P.key.name === 'props')

        const body = []
          .concat(
            thisDestructuring
              ? [
                  content.substring(
                    renderMethod.body.start,
                    thisDestructuring.start,
                  ),
                  content.substring(
                    thisDestructuring.end,
                    renderMethod.body.end,
                  ),
                ]
              : content.substring(...renderMethod.body.range),
          )
          .join('')
          .replace('this.#stateful', 'stateful')
          .replace('this.#stateless', 'stateless')

        const staticDeclarationCode = stateMethods
          .map(
            (method) => `
const ${method.key.id.name} = ${content.substring(...method.value.range)}`,
          )
          .join('\n')
        const propsArgCode = propsValues
          ? content.substring(...propsValues.value.range)
          : ''
        return [
          content.substring(0, ClassDeclaration.start),
          `
${staticDeclarationCode}

const ${ClassDeclaration.id.name} = React.memo((${propsArgCode}) => {
  ${body.substring(1, body.length - 1)}
})
`,
          content.substring(ClassDeclaration.end),
        ].join('')
      }
    }
    return content
  })
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
