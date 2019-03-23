/**
 * Test for TheIconStyle.
 * Runs with mocha.
 */
'use strict'

import TheIconStyle from '../lib/TheIconStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-icon-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheIconStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
