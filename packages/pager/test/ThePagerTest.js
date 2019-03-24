/**
 * Test for ThePager.
 * Runs with mocha.
 */
'use strict'

import ThePager from '../lib/ThePager'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-pager', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <ThePager />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
