/**
 * Test for TheInputNumber.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputNumber from '../lib/TheInputNumber'

describe('the-input-number', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputNumber />)
    ok(element)
  })
})

/* global describe, before, after, it */
