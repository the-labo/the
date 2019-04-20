/**
 * Test for TheCopyboard.
 * Runs with mocha.
 */
'use strict'

import TheCopyboard from '../lib/TheCopyboard'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-copyboard', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCopyboard />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
