/**
 * Test for TheImageStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheImageStyle from '../lib/TheImageStyle'

describe('the-image-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheImageStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
