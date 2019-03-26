/**
 * Test for TheListGroup.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheListGroup from '../lib/TheListGroup'

describe('the-list-group', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheListGroup />)
    ok(element)
  })
})

/* global describe, before, after, it */
