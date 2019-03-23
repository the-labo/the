/**
 * Test for TheHtmlStyle.
 * Runs with mocha.
 */
'use strict'

import TheHtmlStyle from '../lib/TheHtmlStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-html-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheHtmlStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
