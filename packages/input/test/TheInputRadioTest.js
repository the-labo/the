/**
 * Test for TheInputRadio.
 * Runs with mocha.
 */
'use strict'

import TheInputRadio from '../lib/TheInputRadio'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-radio', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputRadio />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
