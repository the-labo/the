/**
 * Test for TheInputPinCode.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputPinCode from '../lib/TheInputPinCode'

describe('the-input-pin-code', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputPinCode />)
    ok(element)
  })
})

/* global describe, before, after, it */
