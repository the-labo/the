/**
 * Test for processYAML.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processYAML = require('../lib/processors/processYAML')

describe('process-yam-l', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processYAML(`
language: node_js
node_js:
- '11'
install:
- npm cache verify
- npm install
script:
- npm run build
- npm run doc
- npm run test
      `),
      `install:
  - npm cache verify
  - npm install
language: node_js
node_js:
  - '11'
script:
  - npm run build
  - npm run doc
  - npm run test
`,
    )
  })

  it('With comments', async () => {
    equal(
      await processYAML(`b: this is b
a: # this is a
  # this is a2
  - a2: 2
  - a1: 
    x: 2
    d: 4
      `),
      `a: # this is a
  # this is a2
  - a2: 2
  - a1: null
    d: 4
    x: 2
b: this is b
`,
    )
  })
})

/* global describe, before, after, it */