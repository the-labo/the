/**
 * Test for TheCaught.
 * Runs with mocha.
 */
'use strict'

import TheCaught from '../lib/TheCaught'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-caught', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheCaught/>
    )
    ok(!element)
  })
})

/* global describe, before, after, it */
