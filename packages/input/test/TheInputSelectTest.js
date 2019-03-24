/**
 * Test for TheInputSelect.
 * Runs with mocha.
 */
'use strict'

import TheInputSelect from '../lib/TheInputSelect'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-select', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputSelect />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
