/**
 * Test for TheRoot.
 * Runs with mocha.
 */
'use strict'

import TheRoot from '../lib/TheRoot'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-root', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheRoot />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
