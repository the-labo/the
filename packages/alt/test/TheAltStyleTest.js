/**
 * Test for TheAltStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheAltStyle from '../lib/TheAltStyle'

describe('the-alt-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheAltStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
