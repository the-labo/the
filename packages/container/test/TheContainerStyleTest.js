/**
 * Test for TheContainerStyle.
 * Runs with mocha.
 */
'use strict'

import TheContainerStyle from '../lib/TheContainerStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-container-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheContainerStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
