'use strict'

/**
 * Test for TheTableStyle.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheTableStyle from '../lib/TheTableStyle'

describe('the-table-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheTableStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
