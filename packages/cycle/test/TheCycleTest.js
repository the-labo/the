/**
 * Test for TheCycle.
 * Runs with mocha.
 */
'use strict'

import TheCycle from '../lib/TheCycle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-cycle', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const element = render(
      <TheCycle/>
    )
    ok(element)
  })
})

/* global describe, before, after, it */
