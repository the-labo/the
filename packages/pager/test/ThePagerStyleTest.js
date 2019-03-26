/**
 * Test for ThePagerStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import ThePagerStyle from '../lib/ThePagerStyle'

describe('the-pager-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<ThePagerStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
