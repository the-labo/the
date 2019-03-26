/**
 * Test for TheList.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheList from '../lib/TheList'

describe('the-list', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheList />)
    ok(element)
  })
})

/* global describe, before, after, it */
