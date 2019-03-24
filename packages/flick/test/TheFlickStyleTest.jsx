/**
 * Test for TheFlickStyle.
 * Runs with mocha.
 */
'use strict'

import TheFlickStyle from '../lib/TheFlickStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-flick-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheFlickStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
