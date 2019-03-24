/**
 * Test for TheMenuStyle.
 * Runs with mocha.
 */
'use strict'

import TheMenuStyle from '../lib/TheMenuStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-menu-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMenuStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
