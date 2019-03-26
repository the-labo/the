/**
 * Test for TheInputToggle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputToggle from '../lib/TheInputToggle'

describe('the-input-toggle', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputToggle />)
    ok(element)
  })
})

/* global describe, before, after, it */
