'use strict'

/**
 * Test for TheSignatureStyle.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheSignatureStyle from '../lib/TheSignatureStyle'

describe('the-signature-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheSignatureStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
