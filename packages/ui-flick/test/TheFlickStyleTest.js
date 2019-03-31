/**
 * Test for TheFlickStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheFlickStyle from '../lib/TheFlickStyle'

describe('the-flick-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheFlickStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
