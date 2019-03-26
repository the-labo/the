/**
 * Test for TheHamburgerStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheHamburgerStyle from '../lib/TheHamburgerStyle'

describe('the-hamburger-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheHamburgerStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
