/**
 * Test for TheSignature.
 * Runs with mocha.
 */
'use strict'

import TheSignature from '../lib/TheSignature'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-signature', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheSignature />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
