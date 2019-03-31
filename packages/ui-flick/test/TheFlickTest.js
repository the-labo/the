/**
 * Test for TheFlick.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheFlick from '../lib/TheFlick'

describe('the-flick', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheFlick />)
    ok(element)
  })
})

/* global describe, before, after, it */
