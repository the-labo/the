/**
 * Test for TheCam.
 * Runs with mocha.
 */
'use strict'

import '@babel/polyfill'
import TheCam from '../lib/TheCam'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-cam', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheCam/>
    )
    ok(element)
  })
})

/* global describe, before, after, it */
