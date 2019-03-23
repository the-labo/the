/**
 * Test for TheMain.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheMain from '../lib/TheMain'

describe('the-main', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheMain />)
    ok(element)
  })
})

/* global describe, before, after, it */
