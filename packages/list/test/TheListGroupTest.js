/**
 * Test for TheListGroup.
 * Runs with mocha.
 */
'use strict'

import TheListGroup from '../lib/TheListGroup'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-list-group', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheListGroup />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
