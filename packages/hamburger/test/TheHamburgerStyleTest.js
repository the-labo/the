/**
 * Test for TheHamburgerStyle.
 * Runs with mocha.
 */
'use strict'

import TheHamburgerStyle from '../lib/TheHamburgerStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-hamburger-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheHamburgerStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
