/**
 * Test for TheLinkStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheLinkStyle from '../lib/TheLinkStyle'

describe('the-link-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheLinkStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
