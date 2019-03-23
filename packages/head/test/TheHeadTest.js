/**
 * Test for TheHead.
 * Runs with mocha.
 */
'use strict'

import TheHead from '../lib/TheHead'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-head', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const element = render(
      <TheHead color='#38E'/>
    )
    ok(element)
  })
})

/* global describe, before, after, it */
