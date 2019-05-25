'use strict'
/**
 * Test for TheKeyboard.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheKeyboard from '../lib/TheKeyboard'

describe('the-keyboard', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheKeyboard />)
    ok(element)
  })
})

/* global describe, before, after, it */
