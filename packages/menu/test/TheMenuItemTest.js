/**
 * Test for TheMenuItem.
 * Runs with mocha.
 */
'use strict'

import TheMenuItem from '../lib/TheMenuItem'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-menu-item', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMenuItem />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
