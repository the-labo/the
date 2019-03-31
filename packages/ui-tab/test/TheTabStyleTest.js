/**
 * Test for TheTabStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheTabStyle from '../lib/TheTabStyle'

describe('the-tab-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheTabStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
