/**
 * Test for TheImage.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheImage from '../lib/TheImage'

describe('the-image', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheImage />)
    ok(element)
  })
})

/* global describe, before, after, it */
