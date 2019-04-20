/**
 * Test for TheChartStyle.
 * Runs with mocha.
 */
'use strict'

import TheChartStyle from '../lib/TheChartStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-chart-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheChartStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
