/**
 * Test for TheRootStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheRootStyle from '../lib/TheRootStyle'

describe('the-root-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheRootStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
