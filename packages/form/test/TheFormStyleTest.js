/**
 * Test for TheFormStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheFormStyle from '../lib/TheFormStyle'

describe('the-form-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheFormStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
