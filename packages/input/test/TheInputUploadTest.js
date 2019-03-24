/**
 * Test for TheInputUpload.
 * Runs with mocha.
 */
'use strict'

import TheInputUpload from '../lib/TheInputUpload'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-upload', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputUpload />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
