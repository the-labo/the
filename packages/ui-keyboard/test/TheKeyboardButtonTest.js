'use strict'

/**
 * Test for TheKeyboardButton.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheKeyboardButton from '../lib/TheKeyboardButton'

describe('the-keyboard-button', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheKeyboardButton />)
    ok(element)
  })
})

/* global describe, before, after, it */
