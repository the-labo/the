/**
 * Test for TheInputText.
 * Runs with mocha.
 */
'use strict'

import TheInputText from '../lib/TheInputText'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-text', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let state = {}
    let element = render(
      <TheInputText name='foo'
                    onUpdate={(values) => { state.values = values }}
      />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
