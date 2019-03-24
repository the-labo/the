/**
 * Test for TheInputStyle.
 * Runs with mocha.
 */
'use strict'

import TheInputStyle from '../lib/TheInputStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
