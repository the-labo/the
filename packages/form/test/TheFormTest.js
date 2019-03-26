/**
 * Test for TheForm.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheForm from '../lib/TheForm'

describe('the-form', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheForm />)
    ok(element)
  })
})

/* global describe, before, after, it */
