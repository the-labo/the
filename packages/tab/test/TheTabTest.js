/**
 * Test for TheTab.
 * Runs with mocha.
 */
'use strict'

import TheTab from '../lib/TheTab'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-tab', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheTab />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
