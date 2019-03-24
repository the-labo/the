/**
 * Test for TheInputSearch.
 * Runs with mocha.
 */
'use strict'

import TheInputSearch from '../lib/TheInputSearch'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-search', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputSearch />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
