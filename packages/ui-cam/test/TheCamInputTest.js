/**
 * Test for TheCamInput.
 * Runs with mocha.
 */
'use strict'

import '@babel/polyfill'
import TheCamInput from '../lib/TheCamInput'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-cam-input', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCamInput />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
