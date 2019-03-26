/**
 * Test for TheFormBinder.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheFormBinder from '../lib/TheFormBinder'

describe('the-form-binder', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheFormBinder>{() => null}</TheFormBinder>)
    ok(element)
  })
})

/* global describe, before, after, it */
