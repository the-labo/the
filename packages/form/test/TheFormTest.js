/**
 * Test for TheForm.
 * Runs with mocha.
 */
'use strict'

import TheForm from '../lib/TheForm'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-form', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheForm />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
