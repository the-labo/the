/**
 * Test for TheChartStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheChartStyle from '../lib/TheChartStyle'

describe('the-chart-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheChartStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
