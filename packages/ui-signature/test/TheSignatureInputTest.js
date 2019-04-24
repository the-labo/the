/**
 * Test for TheSignatureInput.
 * Runs with mocha.
 */
'use strict'

import TheSignatureInput from '../lib/TheSignatureInput'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-signature-input', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheSignatureInput />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
