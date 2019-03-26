/**
 * Test for TheConfirmDialog.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheConfirmDialog from '../lib/TheConfirmDialog'

describe('the-confirm-dialog', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheConfirmDialog />)
    ok(element)
  })
})

/* global describe, before, after, it */
