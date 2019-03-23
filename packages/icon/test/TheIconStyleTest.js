/**
 * Test for TheIconStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheIconStyle from '../lib/TheIconStyle'

describe('the-icon-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheIconStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
