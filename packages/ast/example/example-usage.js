'use strict'

const { parse } = require('@the-/ast')

async function tryExample() {
  const ast = parse(`const a = 1 + 2`)
}

tryExample().catch((err) => console.error(err))
