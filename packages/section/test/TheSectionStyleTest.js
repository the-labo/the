/**
 * Test for TheSectionStyle.
 * Runs with mocha.
 */
'use strict'

import TheSectionStyle from '../lib/TheSectionStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-section-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheSectionStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
