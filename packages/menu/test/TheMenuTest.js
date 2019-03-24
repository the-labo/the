/**
 * Test for TheMenu.
 * Runs with mocha.
 */
'use strict'

import TheMenu from '../lib/TheMenu'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-menu', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMenu />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
