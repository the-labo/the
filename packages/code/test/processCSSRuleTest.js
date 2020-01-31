'use strict'

/**
 * @file Test for processCSSRule.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processCSSRule = require('../lib/processors/processCSSRule')

describe('process-c-s-s-rule', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processCSSRule(`
.x {color: white; & .inner {color:green;}; &.inner: {background:orange;} &:hover {color:green;};}
.a {color: white;}
      `),
      `
.a {color: white;}
.x {color: white; &:hover {color:green;}; &.inner: {background:orange;} & .inner {color:green;};}
      `,
    )
  })

  it('More complex', async () => {
    equal(
      await processCSSRule(`
.self:global(.the-form) {
  min-width: 96px;
  margin: 8px;
  padding: 0;

  &:hover {
    color: green;
  }

  & .hoge {
    padding: 0;
  }
}

.a {
  /** This is comment3 */
  color: #555;
  /** This is comment */
  /** This is comment2 */
  background: #EEE;
}
      `),
      `
.a {
  /** This is comment3 */
  color: #555;
  /** This is comment */
  /** This is comment2 */
  background: #EEE;
}

.self:global(.the-form) {
  min-width: 96px;
  margin: 8px;
  padding: 0;

  &:hover {
    color: green;
  }

  & .hoge {
    padding: 0;
  }
}
      `,
    )
  })

  it('Without line break', async () => {
    console.log(await processCSSRule('.foo{&.bar{color:black;}}'))
  })
})

/* global describe, before, after, it */
