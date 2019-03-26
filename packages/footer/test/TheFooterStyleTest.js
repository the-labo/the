/**
 * Test for TheFooterStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheFooterStyle from '../lib/TheFooterStyle'

describe('the-footer-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheFooterStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
