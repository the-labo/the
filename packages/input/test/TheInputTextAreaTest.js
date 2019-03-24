/**
 * Test for TheInputTextArea.
 * Runs with mocha.
 */
'use strict'

import TheInputTextArea from '../lib/TheInputTextArea'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-text-area', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputTextArea />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
