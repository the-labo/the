/**
 * Test for TheInputPinCode.
 * Runs with mocha.
 */
'use strict'

import TheInputPinCode from '../lib/TheInputPinCode'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-pin-code', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputPinCode />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
