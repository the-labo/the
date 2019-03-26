/**
 * Test for TheView.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheView from '../lib/TheView'

describe('the-view', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheView />)
    ok(element)
  })
})

/* global describe, before, after, it */
