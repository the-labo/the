/**
 * Test for TheHtml.
 * Runs with mocha.
 */
'use strict'

import TheHtml from '../lib/TheHtml'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-html', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheHtml >
        <body>
        <main>
          <h1>Hoo</h1>
        </main>
        </body>
      </TheHtml>
    )
    ok(element)
  })
})

/* global describe, before, after, it */
