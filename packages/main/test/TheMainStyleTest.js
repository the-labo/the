/**
 * Test for TheMainStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheMainStyle from '../lib/TheMainStyle'

describe('the-main-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheMainStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
