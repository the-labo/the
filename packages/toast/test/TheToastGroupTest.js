/**
 * Test for TheToastGroup.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheToastGroup from '../lib/TheToastGroup'

describe('the-toast-group', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheToastGroup />)
    ok(element)
  })
})

/* global describe, before, after, it */
