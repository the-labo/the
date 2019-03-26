/**
 * Test for TheTab.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheTab from '../lib/TheTab'

describe('the-tab', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheTab />)
    ok(element)
  })
})

/* global describe, before, after, it */
