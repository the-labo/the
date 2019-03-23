/**
 * Test for TheButtonStyle.
 * Runs with mocha.
 */
'use strict'

import TheButtonStyle from '../lib/TheButtonStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-button-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheButtonStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
