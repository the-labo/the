/**
 * Test for TheInputTag.
 * Runs with mocha.
 */
'use strict'

import TheInputTag from '../lib/TheInputTag'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-tag', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputTag />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
