/**
 * Test for TheCaughtStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCaughtStyle from '../lib/TheCaughtStyle'

describe('the-caught-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheCaughtStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
