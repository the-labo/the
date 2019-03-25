/**
 * Test for TheTableStyle.
 * Runs with mocha.
 */
'use strict'

import TheTableStyle from '../lib/TheTableStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-table-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheTableStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
