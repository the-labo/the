/**
 * Test for TheBar.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheBar from '../lib/TheBar'

describe('the-bar', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheBar />)
    ok(element)
  })
})

/* global describe, before, after, it */
