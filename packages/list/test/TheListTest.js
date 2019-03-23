/**
 * Test for TheList.
 * Runs with mocha.
 */
'use strict'

import TheList from '../lib/TheList'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-list', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheList />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
