/**
 * Test for TheViewStyle.
 * Runs with mocha.
 */
'use strict'

import TheViewStyle from '../lib/TheViewStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-view-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheViewStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
