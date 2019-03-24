/**
 * Test for TheInputCheckbox.
 * Runs with mocha.
 */
'use strict'

import TheInputCheckbox from '../lib/TheInputCheckbox'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-checkbox', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputCheckbox />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
