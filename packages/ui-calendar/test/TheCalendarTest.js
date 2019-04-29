/**
 * Test for TheCalendar.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCalendar from '../lib/TheCalendar'

describe('the-calendar', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheCalendar />)
    ok(element)
  })
})

/* global describe, before, after, it */
