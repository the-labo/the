/**
 * Test for processCSSProp.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const processCSSProp = require('../lib/processors/processCSSProp')

describe('process-c-s-s-props', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processCSSProp(`
.a{
 color: #555;
 background: #EEE;
}
`),
      `
.a{
 background: #EEE;
 color: #555;
}
`,
    )
  })

  it('With comment', async () => {
    equal(
      await processCSSProp(`
.a{
 color: #555;
 /** This is comment */
 /** This is comment2 */
 background: #EEE;
}
      `),
      `
.a{
 /** This is comment */
 /** This is comment2 */
 background: #EEE;
 color: #555;
}
      `,
    )
  })

  it('Two parents', async () => {
    equal(
      await processCSSProp(`
.a {color:#eee;background:#eee;}
.b {background:#eee;}
`),
      `
.a {background:#eee;color:#eee;}
.b {background:#eee;}
`,
    )
  })

  it('Duplicate props', async () => {
    equal(
      await processCSSProp(`
.bar {
  width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #999;
  background: var(--dominant-color);
  overflow: visible;
  margin: 0 8px;
  flex-shrink: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}
      `),
      `
.bar {
  align-items: center;
  background: #999;
  background: var(--dominant-color);
  bottom: 0;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  left: 0;
  margin: 0 8px;
  overflow: visible;
  position: absolute;
  top: 0;
  width: 2px;
}
      `,
    )
  })
})

/* global describe, before, after, it */
