/**
 * Test for TheInputRadio.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputRadio from '../lib/TheInputRadio'

describe('the-input-radio', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputRadio />)
    ok(element)
  })
})

/* global describe, before, after, it */
