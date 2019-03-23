/**
 * Test for TheAltStyle.
 * Runs with mocha.
 */
'use strict'

import TheAltStyle from '../lib/TheAltStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-alt-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheAltStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
