/**
 * Test for TheMeta.
 * Runs with mocha.
 */
'use strict'

import TheMeta from '../lib/TheMeta'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-meta', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMeta />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
