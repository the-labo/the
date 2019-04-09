/**
 * Test for TheQrStyle.
 * Runs with mocha.
 */
'use strict'

import TheQrStyle from '../lib/TheQrStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-qr-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheQrStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
