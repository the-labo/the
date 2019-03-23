/**
 * Test for TheButtonGroup.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheButtonGroup from '../lib/TheButtonGroup'

describe('the-button-group', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheButtonGroup />)
    ok(element)
  })
})

/* global describe, before, after, it */
