/**
 * Test for TheRoot.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheRoot from '../lib/TheRoot'

describe('the-root', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheRoot />)
    ok(element)
  })
})

/* global describe, before, after, it */
