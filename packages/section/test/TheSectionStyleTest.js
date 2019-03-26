/**
 * Test for TheSectionStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheSectionStyle from '../lib/TheSectionStyle'

describe('the-section-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheSectionStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
