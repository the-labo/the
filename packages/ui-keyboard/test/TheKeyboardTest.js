/**
 * Test for TheKeyboard.
 * Runs with mocha.
 */
'use strict'

import TheKeyboard from '../lib/TheKeyboard'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-keyboard', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheKeyboard />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
