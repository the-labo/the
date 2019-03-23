/**
 * Test for TheInfo.
 * Runs with mocha.
 */
'use strict'

import TheInfo from '../lib/TheInfo'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-info', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInfo />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
