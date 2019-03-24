/**
 * Test for TheRouterStyle.
 * Runs with mocha.
 */
'use strict'

import TheRouterStyle from '../lib/TheRouterStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-router-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheRouterStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
