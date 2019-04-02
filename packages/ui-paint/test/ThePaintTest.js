/**
 * Test for ThePaint.
 * Runs with mocha.
 */
'use strict'

import ThePaint from '../lib/ThePaint'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-paint', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <ThePaint />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
