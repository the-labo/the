'use strict'

/**
 * Test for TheCopyboardStyle.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCopyboardStyle from '../lib/TheCopyboardStyle'

describe('the-copyboard-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheCopyboardStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
