/**
 * Test for TheToast.
 * Runs with mocha.
 */
'use strict'

import TheToast from '../lib/TheToast'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-toast', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheToast />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
