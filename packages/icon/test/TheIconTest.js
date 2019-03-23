/**
 * Test for TheIcon.
 * Runs with mocha.
 */
'use strict'

import TheIcon from '../lib/TheIcon'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-icon', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheIcon />
    )
    ok(element)
  })

  it('Render a spin component', () => {
    let element = render(
      <TheIcon.Spin />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
