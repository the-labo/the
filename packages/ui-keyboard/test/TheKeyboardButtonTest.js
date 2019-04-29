/**
 * Test for TheKeyboardButton.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheKeyboardButton from '../lib/TheKeyboardButton'

describe('the-keyboard-button', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheKeyboardButton />)
    ok(element)
  })
})

/* global describe, before, after, it */
