/**
 * Test for TheContainer.
 * Runs with mocha.
 */
'use strict'

import TheContainer from '../lib/TheContainer'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-container', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheContainer />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
