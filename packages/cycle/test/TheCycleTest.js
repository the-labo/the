/**
 * Test for TheCycle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCycle from '../lib/TheCycle'

describe('the-cycle', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheCycle />)
    ok(element)
  })
})

/* global describe, before, after, it */
