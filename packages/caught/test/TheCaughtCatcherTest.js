/**
 * Test for TheCaughtCatcher.
 * Runs with mocha.
 */
'use strict'

import TheCaughtCatcher from '../lib/TheCaughtCatcher'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-caught-catcher', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheCaughtCatcher />
    )
  })
})

/* global describe, before, after, it */
