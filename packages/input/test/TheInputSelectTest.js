/**
 * Test for TheInputSelect.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputSelect from '../lib/TheInputSelect'

describe('the-input-select', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputSelect />)
    ok(element)
  })
})

/* global describe, before, after, it */
