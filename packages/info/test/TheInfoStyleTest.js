/**
 * Test for TheInfoStyle.
 * Runs with mocha.
 */
'use strict'

import TheInfoStyle from '../lib/TheInfoStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-info-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInfoStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
