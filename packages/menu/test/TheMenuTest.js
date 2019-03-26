/**
 * Test for TheMenu.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheMenu from '../lib/TheMenu'

describe('the-menu', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheMenu />)
    ok(element)
  })
})

/* global describe, before, after, it */
