/**
 * Test for TheCalendarStyle.
 * Runs with mocha.
 */
'use strict'

import TheCalendarStyle from '../lib/TheCalendarStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-calendar-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCalendarStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
