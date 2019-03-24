/**
 * Test for TheLink.
 * Runs with mocha.
 */
'use strict'

import TheLink from '../lib/TheLink'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-link', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element01 = render(
      <TheLink to='foo' replace={false}> FOO </TheLink>
    )
    ok(element01)
  })
})

/* global describe, before, after, it */
