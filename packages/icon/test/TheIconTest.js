/**
 * Test for TheIcon.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheIcon from '../lib/TheIcon'

describe('the-icon', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheIcon />)
    ok(element)
  })

  it('Render a spin component', () => {
    let element = render(<TheIcon.Spin />)
    ok(element)
  })
})

/* global describe, before, after, it */
