/**
 * Test for TheDropdownMenu.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheDropdownMenu from '../lib/TheDropdownMenu'

describe('the-dropdown-menu', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheDropdownMenu />)
    ok(element)
  })
})

/* global describe, before, after, it */
