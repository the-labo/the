/**
 * Test for TheSignature.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheSignature from '../lib/TheSignature'

describe('the-signature', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheSignature />)
    ok(element)
  })
})

/* global describe, before, after, it */
