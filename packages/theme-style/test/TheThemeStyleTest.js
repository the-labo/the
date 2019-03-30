/**
 * Test for TheThemeStyle.
 * Runs with mocha.
 */
'use strict'

import TheThemeStyle from '../lib/TheThemeStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-theme-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheThemeStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
