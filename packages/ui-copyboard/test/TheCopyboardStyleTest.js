/**
 * Test for TheCopyboardStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCopyboardStyle from '../lib/TheCopyboardStyle'

describe('the-copyboard-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheCopyboardStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
