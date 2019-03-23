/**
 * Test for TheHamburger.
 * Runs with mocha.
 */
'use strict'

import TheHamburger from '../lib/TheHamburger'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-hamburger', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheHamburger />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
