/**
 * Test for ThePagerStyle.
 * Runs with mocha.
 */
'use strict'

import ThePagerStyle from '../lib/ThePagerStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-pager-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <ThePagerStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
