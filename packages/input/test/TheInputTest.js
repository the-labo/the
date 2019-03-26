/**
 * Test for TheInput.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInput from '../lib/TheInput'

describe('the-input', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInput />)
    ok(element)
  })
})

/* global describe, before, after, it */
