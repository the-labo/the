/**
 * Test for TheInputSearch.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputSearch from '../lib/TheInputSearch'

describe('the-input-search', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputSearch />)
    ok(element)
  })
})

/* global describe, before, after, it */
