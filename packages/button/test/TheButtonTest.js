/**
 * Test for TheButton.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheButton from '../lib/TheButton'

describe('the-button', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheButton />)
    ok(element)
  })
})

/* global describe, before, after, it */
