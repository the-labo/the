/**
 * Test for TheOkDialog.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheOkDialog from '../lib/TheOkDialog'

describe('the-ok-dialog', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheOkDialog />)
    ok(element)
  })
})

/* global describe, before, after, it */
