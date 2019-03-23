/**
 * Test for TheFooter.
 * Runs with mocha.
 */
'use strict'

import TheFooter from '../lib/TheFooter'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-footer', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheFooter />
    )
    ok(element)

    {
      let link = render(
        <TheFooter.Link className='hoge'>foo</TheFooter.Link>
      )
      ok(link)
    }
  })
})

/* global describe, before, after, it */
