/**
 * Test for TheButtonStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheButtonStyle from '../lib/TheButtonStyle'

describe('the-button-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheButtonStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
