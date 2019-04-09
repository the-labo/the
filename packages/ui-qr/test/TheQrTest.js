/**
 * Test for TheQr.
 * Runs with mocha.
 */
'use strict'

import TheQr from '../lib/TheQr'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-qr', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheQr />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
