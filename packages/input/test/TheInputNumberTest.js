/**
 * Test for TheInputNumber.
 * Runs with mocha.
 */
'use strict'

import TheInputNumber from '../lib/TheInputNumber'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-number', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputNumber />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
