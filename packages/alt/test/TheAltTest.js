/**
 * Test for TheAlt.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheAlt from '../lib/TheAlt'

describe('the-alt', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheAlt enabled />)
    ok(element)
  })
})

/* global describe, before, after, it */
