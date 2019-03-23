/**
 * Test for TheBarStyle.
 * Runs with mocha.
 */
'use strict'

import TheBarStyle from '../lib/TheBarStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-bar-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheBarStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
