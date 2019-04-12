/**
 * Test for TheKeyboardButton.
 * Runs with mocha.
 */
'use strict'

import TheKeyboardButton from '../lib/TheKeyboardButton'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-keyboard-button', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheKeyboardButton />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
