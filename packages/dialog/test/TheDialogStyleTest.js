/**
 * Test for TheDialogStyle.
 * Runs with mocha.
 */
'use strict'

import TheDialogStyle from '../lib/TheDialogStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-dialog-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheDialogStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
