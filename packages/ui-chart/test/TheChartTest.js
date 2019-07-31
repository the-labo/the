'use strict'

/**
 * Test for TheChart.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheChart from '../lib/TheChart'

describe('the-chart', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheChart />)
    ok(element)
  })
})

/* global describe, before, after, it */
