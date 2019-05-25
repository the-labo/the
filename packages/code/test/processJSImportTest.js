'use strict'
/**
 * Test for processJSImport.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const processJSImport = require('../lib/processors/processJSImport')

describe('process-j-s-import', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSImport(
        `
import bar from '@self/bar'
import baz from '../baz'
import foo from './foo'
import * as n from 'n'
import z from 'z'
import a from 'a'
      `,
        { sourceType: 'module' },
      ),
      `
import a from 'a'
import * as n from 'n'
import z from 'z'
import bar from '@self/bar'
import foo from './foo'
import baz from '../baz'
      `,
    )
  })

  it('Import values', async () => {
    equal(
      await processJSImport(
        `
import {z, c, n as a,} from 'x'
      `,
        { sourceType: 'module' },
      ),
      `
import {c, n as a, z,} from 'x'
      `,
    )
  })

  it('Normalize path', async () => {
    equal(
      await processJSImport("import x from '../b/x.js'", {
        filename: '/a/b/c.js',
        sourceType: 'module',
      }),
      "import x from './x'",
    )
  })

  it('with polyfill', async () => {
    equal(
      await processJSImport(
        `
import 'the-polyfill/apply'
import App from './App'
import React from 'react'
      `,
        { sourceType: 'module' },
      ),
      `
import 'the-polyfill/apply'
import React from 'react'
import App from './App'
      `,
    )
  })

  it('Remove ext', async () => {
    equal(
      await processJSImport(
        `
import 'chart.js'
import x from './x.js'
      `,
        { sourceType: 'module' },
      ),
      `
import 'chart.js'
import x from './x'
      `,
    )
  })

  it('Merge duplicate', async () => {
    equal(
      await processJSImport(`
import {a, b, d as DD} from 'X'
import {j} from 'Y'
import 'Z'
import X, {c} from 'X'
import 'Z2'
`),
      `
import X, { a, b, c, d as DD } from 'X'
import {j} from 'Y'
import 'Z'

import 'Z2'
`,
    )
  })
})

/* global describe, before, after, it */
