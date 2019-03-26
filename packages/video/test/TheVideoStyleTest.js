/**
 * Test for TheVideoStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheVideoStyle from '../lib/TheVideoStyle'

describe('the-video-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheVideoStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
