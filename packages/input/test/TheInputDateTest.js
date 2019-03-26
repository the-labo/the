/**
 * Test for TheInputDate.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputDate from '../lib/TheInputDate'

describe('the-input-date', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputDate />)
    ok(element)
  })
})

/* global describe, before, after, it */
