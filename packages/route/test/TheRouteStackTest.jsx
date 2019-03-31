/**
 * Test for TheRouteStack.
 * Runs with mocha.
 */
'use strict'

import TheRouteStack from '../lib/TheRouteStack'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-route-stack', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheRouteStack />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
