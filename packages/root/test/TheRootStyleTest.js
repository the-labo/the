/**
 * Test for TheRootStyle.
 * Runs with mocha.
 */
'use strict'

import TheRootStyle from '../lib/TheRootStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-root-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheRootStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
