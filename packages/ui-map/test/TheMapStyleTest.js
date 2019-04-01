/**
 * Test for TheMapStyle.
 * Runs with mocha.
 */
'use strict'

import TheMapStyle from '../lib/TheMapStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-map-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMapStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
