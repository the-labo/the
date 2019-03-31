/**
 * Test for TheRoute.
 * Runs with mocha.
 */
'use strict'

import TheRoute from '../lib/TheRoute'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-route', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheRoute />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
