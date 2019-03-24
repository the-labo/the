/**
 * Test for TheInputToggle.
 * Runs with mocha.
 */
'use strict'

import TheInputToggle from '../lib/TheInputToggle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-toggle', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputToggle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
