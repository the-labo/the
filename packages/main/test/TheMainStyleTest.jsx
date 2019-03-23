/**
 * Test for TheMainStyle.
 * Runs with mocha.
 */
'use strict'

import TheMainStyle from '../lib/TheMainStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-main-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMainStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
