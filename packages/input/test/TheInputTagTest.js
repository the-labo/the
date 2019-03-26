/**
 * Test for TheInputTag.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputTag from '../lib/TheInputTag'

describe('the-input-tag', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputTag />)
    ok(element)
  })
})

/* global describe, before, after, it */
