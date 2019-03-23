/**
 * Test for TheCaughtStyle.
 * Runs with mocha.
 */
'use strict'

import TheCaughtStyle from '../lib/TheCaughtStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-caught-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCaughtStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
