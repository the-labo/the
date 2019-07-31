'use strict'

/**
 * Test for TheCopyboard.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCopyboard from '../lib/TheCopyboard'

describe('the-copyboard', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheCopyboard />)
    ok(element)
  })
})

/* global describe, before, after, it */
