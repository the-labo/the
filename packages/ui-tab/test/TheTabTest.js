'use strict'
/**
 * Test for TheTab.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheTab from '../lib/TheTab'

describe('the-tab', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheTab />)
    ok(element)
  })
})

/* global describe, before, after, it */
