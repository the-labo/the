/**
 * Test for TheAlt.
 * Runs with mocha.
 */
'use strict'

import TheAlt from '../lib/TheAlt'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-alt', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheAlt enabled/>
    )
    ok(element)
  })
})

/* global describe, before, after, it */
