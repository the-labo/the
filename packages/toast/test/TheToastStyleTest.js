/**
 * Test for TheToastStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheToastStyle from '../lib/TheToastStyle'

describe('the-toast-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheToastStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
