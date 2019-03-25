/**
 * Test for TheFormStyle.
 * Runs with mocha.
 */
'use strict'

import TheFormStyle from '../lib/TheFormStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-form-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheFormStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
