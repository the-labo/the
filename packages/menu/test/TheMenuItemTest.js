/**
 * Test for TheMenuItem.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheMenuItem from '../lib/TheMenuItem'

describe('the-menu-item', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheMenuItem />)
    ok(element)
  })
})

/* global describe, before, after, it */
