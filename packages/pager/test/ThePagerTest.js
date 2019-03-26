/**
 * Test for ThePager.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import ThePager from '../lib/ThePager'

describe('the-pager', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<ThePager />)
    ok(element)
  })
})

/* global describe, before, after, it */
