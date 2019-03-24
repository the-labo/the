/**
 * Test for TheInputRange.
 * Runs with mocha.
 */
'use strict'

import TheInputRange from '../lib/TheInputRange'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-range', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputRange />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
