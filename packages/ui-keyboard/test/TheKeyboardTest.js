/**
 * Test for TheKeyboard.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheKeyboard from '../lib/TheKeyboard'

describe('the-keyboard', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheKeyboard />)
    ok(element)
  })
})

/* global describe, before, after, it */
