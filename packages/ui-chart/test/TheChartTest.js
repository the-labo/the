/**
 * Test for TheChart.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheChart from '../lib/TheChart'

describe('the-chart', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheChart />)
    ok(element)
  })
})

/* global describe, before, after, it */
