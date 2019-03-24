/**
 * Test for TheDropdownMenu.
 * Runs with mocha.
 */
'use strict'

import TheDropdownMenu from '../lib/TheDropdownMenu'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-dropdown-menu', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheDropdownMenu />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
