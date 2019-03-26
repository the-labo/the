/**
 * Test for TheInfo.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInfo from '../lib/TheInfo'

describe('the-info', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInfo />)
    ok(element)
  })
})

/* global describe, before, after, it */
