/**
 * Test for TheSignatureStyle.
 * Runs with mocha.
 */
'use strict'

import TheSignatureStyle from '../lib/TheSignatureStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-signature-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheSignatureStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
