/**
 * Test for TheInputTextArea.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputTextArea from '../lib/TheInputTextArea'

describe('the-input-text-area', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputTextArea />)
    ok(element)
  })
})

/* global describe, before, after, it */
