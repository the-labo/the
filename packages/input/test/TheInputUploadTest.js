/**
 * Test for TheInputUpload.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputUpload from '../lib/TheInputUpload'

describe('the-input-upload', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputUpload />)
    ok(element)
  })
})

/* global describe, before, after, it */
