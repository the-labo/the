/**
 * Test for TheFormBinder.
 * Runs with mocha.
 */
'use strict'

import TheFormBinder from '../lib/TheFormBinder'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-form-binder', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheFormBinder>
        {() => null}
      </TheFormBinder>
    )
    ok(element)
  })
})

/* global describe, before, after, it */
