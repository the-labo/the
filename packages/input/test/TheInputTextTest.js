/**
 * Test for TheInputText.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputText from '../lib/TheInputText'

describe('the-input-text', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let state = {}
    let element = render(
      <TheInputText
        name='foo'
        onUpdate={(values) => {
          state.values = values
        }}
      />,
    )
    ok(element)
  })
})

/* global describe, before, after, it */
