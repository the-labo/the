/**
 * Test for TheInputPassword.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputPassword from '../lib/TheInputPassword'

describe('the-input-password', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputPassword />)
    ok(element)
  })
})

/* global describe, before, after, it */
