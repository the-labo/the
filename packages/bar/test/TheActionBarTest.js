/**
 * Test for TheActionBar.
 * Runs with mocha.
 */
'use strict'

import TheActionBar from '../lib/TheActionBar'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-action-bar', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheActionBar />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
