/**
 * Test for TheInputStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputStyle from '../lib/TheInputStyle'

describe('the-input-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
