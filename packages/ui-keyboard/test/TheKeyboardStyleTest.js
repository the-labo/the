/**
 * Test for TheKeyboardStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheKeyboardStyle from '../lib/TheKeyboardStyle'

describe('the-keyboard-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheKeyboardStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
