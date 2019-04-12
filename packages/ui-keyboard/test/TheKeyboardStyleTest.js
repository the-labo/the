/**
 * Test for TheKeyboardStyle.
 * Runs with mocha.
 */
'use strict'

import TheKeyboardStyle from '../lib/TheKeyboardStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-keyboard-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheKeyboardStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
