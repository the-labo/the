/**
 * Test for TheBodyStyle.
 * Runs with mocha.
 */
'use strict'

import TheBodyStyle from '../lib/TheBodyStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-body-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheBodyStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
