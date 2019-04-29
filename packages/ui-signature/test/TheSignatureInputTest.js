/**
 * Test for TheSignatureInput.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheSignatureInput from '../lib/TheSignatureInput'

describe('the-signature-input', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheSignatureInput />)
    ok(element)
  })
})

/* global describe, before, after, it */
