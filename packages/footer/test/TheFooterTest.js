/**
 * Test for TheFooter.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheFooter from '../lib/TheFooter'

describe('the-footer', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheFooter />)
    ok(element)

    {
      let link = render(<TheFooter.Link className='hoge'>foo</TheFooter.Link>)
      ok(link)
    }
  })
})

/* global describe, before, after, it */
