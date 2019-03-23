/**
 * Test for TheConditionStyle.
 * Runs with mocha.
 */
'use strict'

import TheConditionStyle from '../lib/TheConditionStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-condition-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheConditionStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
