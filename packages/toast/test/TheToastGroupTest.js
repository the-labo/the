/**
 * Test for TheToastGroup.
 * Runs with mocha.
 */
'use strict'

import TheToastGroup from '../lib/TheToastGroup'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-toast-group', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheToastGroup />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
