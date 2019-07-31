'use strict'

/**
 * Test for TheCalendarStyle.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCalendarStyle from '../lib/TheCalendarStyle'

describe('the-calendar-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheCalendarStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
