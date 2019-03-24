/**
 * Test for TheTabStyle.
 * Runs with mocha.
 */
'use strict'

import TheTabStyle from '../lib/TheTabStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-tab-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheTabStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
