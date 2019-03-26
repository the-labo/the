/**
 * Test for TheToast.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheToast from '../lib/TheToast'

describe('the-toast', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheToast />)
    ok(element)
  })
})

/* global describe, before, after, it */
