/**
 * Test for TheHead.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheHead from '../lib/TheHead'

describe('the-head', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheHead color='#38E' />)
    ok(element)
  })
})

/* global describe, before, after, it */
