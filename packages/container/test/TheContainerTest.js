/**
 * Test for TheContainer.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheContainer from '../lib/TheContainer'

describe('the-container', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheContainer />)
    ok(element)
  })
})

/* global describe, before, after, it */
