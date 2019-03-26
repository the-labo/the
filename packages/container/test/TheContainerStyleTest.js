/**
 * Test for TheContainerStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheContainerStyle from '../lib/TheContainerStyle'

describe('the-container-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheContainerStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
