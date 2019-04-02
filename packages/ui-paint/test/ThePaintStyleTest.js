/**
 * Test for ThePaintStyle.
 * Runs with mocha.
 */
'use strict'

import ThePaintStyle from '../lib/ThePaintStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-paint-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <ThePaintStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
