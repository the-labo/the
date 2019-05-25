'use strict'
/**
 * Test for TheCalendar.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCalendar from '../lib/TheCalendar'

describe('the-calendar', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheCalendar />)
    ok(element)
  })
})

/* global describe, before, after, it */
