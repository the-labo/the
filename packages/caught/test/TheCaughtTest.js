/**
 * Test for TheCaught.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCaught from '../lib/TheCaught'

describe('the-caught', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheCaught />)
    ok(!element)
  })
})

/* global describe, before, after, it */
