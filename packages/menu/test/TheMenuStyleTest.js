/**
 * Test for TheMenuStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheMenuStyle from '../lib/TheMenuStyle'

describe('the-menu-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheMenuStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
