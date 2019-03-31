/**
 * Test for TheFlick.
 * Runs with mocha.
 */
'use strict'

import TheFlick from '../lib/TheFlick'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-flick', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheFlick />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
