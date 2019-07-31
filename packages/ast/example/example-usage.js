'use strict'

const { parse } = require('@the-/ast')

async function tryExample() {
  const ast = parse('const a = 1 + 2')
  console.log(ast) // -> AST Tree object
}

tryExample().catch((err) => console.error(err))
