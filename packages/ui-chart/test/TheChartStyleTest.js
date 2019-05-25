'use strict'
/**
 * Test for TheChartStyle.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheChartStyle from '../lib/TheChartStyle'

describe('the-chart-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheChartStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
