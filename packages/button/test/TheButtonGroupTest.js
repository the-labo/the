/**
 * Test for TheButtonGroup.
 * Runs with mocha.
 */
'use strict'

import TheButtonGroup from '../lib/TheButtonGroup'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-button-group', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheButtonGroup />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
