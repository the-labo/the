/**
 * Test for TheThemeStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheThemeStyle from '../lib/TheThemeStyle'

describe('the-theme-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheThemeStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
