/**
 * Test for TheInputDate.
 * Runs with mocha.
 */
'use strict'

import TheInputDate from '../lib/TheInputDate'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-date', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputDate />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
