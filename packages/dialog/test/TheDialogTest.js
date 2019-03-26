/**
 * Test for TheDialog.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheDialog from '../lib/TheDialog'

describe('the-dialog', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheDialog />)
    ok(element)
  })
})

/* global describe, before, after, it */
