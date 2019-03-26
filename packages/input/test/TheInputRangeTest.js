/**
 * Test for TheInputRange.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputRange from '../lib/TheInputRange'

describe('the-input-range', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputRange />)
    ok(element)
  })
})

/* global describe, before, after, it */
