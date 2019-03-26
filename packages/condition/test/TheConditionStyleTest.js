/**
 * Test for TheConditionStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheConditionStyle from '../lib/TheConditionStyle'

describe('the-condition-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheConditionStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
