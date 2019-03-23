/**
 * Test for TheConfirmDialog.
 * Runs with mocha.
 */
'use strict'

import TheConfirmDialog from '../lib/TheConfirmDialog'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-confirm-dialog', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheConfirmDialog />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
