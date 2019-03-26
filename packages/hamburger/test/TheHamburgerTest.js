/**
 * Test for TheHamburger.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheHamburger from '../lib/TheHamburger'

describe('the-hamburger', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheHamburger />)
    ok(element)
  })
})

/* global describe, before, after, it */
