/**
 * Test for TheBar.
 * Runs with mocha.
 */
'use strict'

import TheBar from '../lib/TheBar'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-bar', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheBar />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
