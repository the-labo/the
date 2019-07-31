'use strict'

/**
 * Test for TheKeyboardStyle.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheKeyboardStyle from '../lib/TheKeyboardStyle'

describe('the-keyboard-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheKeyboardStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
