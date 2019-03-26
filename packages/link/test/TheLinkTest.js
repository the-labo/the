/**
 * Test for TheLink.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheLink from '../lib/TheLink'

describe('the-link', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element01 = render(
      <TheLink replace={false} to='foo'>
        {' '}
        FOO{' '}
      </TheLink>,
    )
    ok(element01)
  })
})

/* global describe, before, after, it */
