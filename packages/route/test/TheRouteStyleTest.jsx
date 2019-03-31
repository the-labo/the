/**
 * Test for TheRouteStyle.
 * Runs with mocha.
 */
'use strict'

import TheRouteStyle from '../lib/TheRouteStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-route-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheRouteStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
