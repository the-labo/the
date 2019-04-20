/**
 * Test for TheChart.
 * Runs with mocha.
 */
'use strict'

import TheChart from '../lib/TheChart'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-chart', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheChart />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
