/**
 * Test for TheHtmlStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheHtmlStyle from '../lib/TheHtmlStyle'

describe('the-html-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheHtmlStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */
