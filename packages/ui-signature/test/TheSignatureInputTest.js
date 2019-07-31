'use strict'

/**
 * Test for TheSignatureInput.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheSignatureInput from '../lib/TheSignatureInput'

describe('the-signature-input', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheSignatureInput />)
    ok(element)
  })
})

/* global describe, before, after, it */
