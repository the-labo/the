'use strict'

/**
 * Test for processYAML.
 * Runs with mocha.
 */
const {
  strict: { doesNotReject, equal },
} = require('assert')
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

  it('With anchor', async () => {
    await doesNotReject(() =>
      processYAML(`
x: 
  b: &bbb
    n: 123
  a: 
    <<: *bbb
`),
    )
  })

  it('Keep long line', async () => {
    const longWord = new Array(100)
      .fill(null)
      .map(() => 'abc')
      .join('')
    equal(
      await processYAML(`
x: ${longWord}
`),
      `x: ${longWord}
`,
    )
  })

  it('sort with order', async () => {
    equal(
      await processYAML(
        `
c: 1
a: 1
d: 1
b: 
  d: 1
  c: 1
  b: 1
  a: 1
      `,
        {
          rule: {
            sortKeys: ['c', 'b'],
            sortKeysDepth: 1,
          },
        },
      ),
      `c: 1
b:
  a: 1
  b: 1
  c: 1
  d: 1
a: 1
d: 1
`,
    )
  })

  it('Sort sets', async () => {
    equal(
      await processYAML(`
x:
  ? c
  ? d
  ? b
  ? a
      `),
      `x:
  ? a
  ? b
  ? c
  ? d
`,
    )
  })

  it('with anchor', async () => {
    equal(
    await processYAML(`
x:
  c: 1
  a: *nnn
  b: 2
`),
      `x:
  a: *nnn
  b: 2
  c: 1
`
    )
  })
})

/* global describe, before, after, it */
