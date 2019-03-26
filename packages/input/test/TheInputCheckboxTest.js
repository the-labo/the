/**
 * Test for TheInputCheckbox.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputCheckbox from '../lib/TheInputCheckbox'

describe('the-input-checkbox', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputCheckbox />)
    ok(element)
  })
})

/* global describe, before, after, it */
