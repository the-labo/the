/**
 * Test for TheListStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheListStyle from '../lib/TheListStyle'

describe('the-list-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheListStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
