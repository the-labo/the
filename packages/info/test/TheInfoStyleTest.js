/**
 * Test for TheInfoStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInfoStyle from '../lib/TheInfoStyle'

describe('the-info-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInfoStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
