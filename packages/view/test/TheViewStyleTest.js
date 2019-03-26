/**
 * Test for TheViewStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheViewStyle from '../lib/TheViewStyle'

describe('the-view-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheViewStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
