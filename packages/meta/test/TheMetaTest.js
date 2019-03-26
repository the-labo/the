/**
 * Test for TheMeta.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheMeta from '../lib/TheMeta'

describe('the-meta', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheMeta />)
    ok(element)
  })
})

/* global describe, before, after, it */
