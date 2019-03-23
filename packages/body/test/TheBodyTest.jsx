/**
 * Test for TheBody.
 * Runs with mocha.
 */
'use strict'

import TheBody from '../lib/TheBody'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-body', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheBody />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
