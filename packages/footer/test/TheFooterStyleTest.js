/**
 * Test for TheFooterStyle.
 * Runs with mocha.
 */
'use strict'

import TheFooterStyle from '../lib/TheFooterStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-footer-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheFooterStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
