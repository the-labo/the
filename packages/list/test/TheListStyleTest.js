/**
 * Test for TheListStyle.
 * Runs with mocha.
 */
'use strict'

import TheListStyle from '../lib/TheListStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-list-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheListStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
