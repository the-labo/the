/**
 * Test for TheBarStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheBarStyle from '../lib/TheBarStyle'

describe('the-bar-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheBarStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
