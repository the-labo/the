/**
 * Test for TheInputPassword.
 * Runs with mocha.
 */
'use strict'

import TheInputPassword from '../lib/TheInputPassword'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-password', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputPassword />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
