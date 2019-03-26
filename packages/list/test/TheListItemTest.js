/**
 * Test for TheListItem.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheListItem from '../lib/TheListItem'

describe('the-list-item', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheListItem />)
    ok(element)
  })
})

/* global describe, before, after, it */
