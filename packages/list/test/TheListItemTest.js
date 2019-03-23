/**
 * Test for TheListItem.
 * Runs with mocha.
 */
'use strict'

import TheListItem from '../lib/TheListItem'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-list-item', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheListItem />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
