/**
 * Test for TheInput.
 * Runs with mocha.
 */
'use strict'

import TheInput from '../lib/TheInput'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInput />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
