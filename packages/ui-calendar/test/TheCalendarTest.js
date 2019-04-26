/**
 * Test for TheCalendar.
 * Runs with mocha.
 */
'use strict'

import TheCalendar from '../lib/TheCalendar'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-calendar', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCalendar />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
