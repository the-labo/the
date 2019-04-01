/**
 * Test for TheMapPositionInput.
 * Runs with mocha.
 */
'use strict'

import TheMapPositionInput from '../lib/TheMapPositionInput'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-map-position-input', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMapPositionInput />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
