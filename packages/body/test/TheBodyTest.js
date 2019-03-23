/**
 * Test for TheBody.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheBody from '../lib/TheBody'

describe('the-body', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheBody />)
    ok(element)
  })
})

/* global describe, before, after, it */
