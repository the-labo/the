/**
 * Test for TheMapMarker.
 * Runs with mocha.
 */
'use strict'

import TheMapMarker from '../lib/TheMapMarker'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-map-marker', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheMapMarker/>
    )
    ok(!element)
  })
})

/* global describe, before, after, it */
