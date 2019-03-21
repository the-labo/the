/**
 * Test for parseCSS.
 * Runs with mocha.
 */
'use strict'

const parseCSS = require('../lib/parsers/parseCSS')
const {ok, equal} = require('assert')

describe('parse-c-s-s', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const parsed = await parseCSS(`
    
.a { 
  /* Some comment */
  color: white; 
  border: 1px solid green;
}
    `)
    const decls = []
    parsed.walkDecls((node) => decls.push(node))
    ok(decls[0])
    ok(decls[0].parent.nodes[0])
  })

})

/* global describe, before, after, it */
