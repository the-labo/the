/**
 * Test for TheContext.
 * Runs with mocha.
 */
'use strict'

const TheContext = require('../lib/TheContext')
const { ok, equal } = require('assert')

const React = require('react')
const RectDOM = require('react-dom/server')

const c = React.createElement

describe('the-context', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(TheContext)
    const context = new TheContext({})
    context.set({ a: 1, b: 2 })
    equal(context.get('a'), 1)

    const mapped = []
    {
      const Toast = () => (
        c(
          context.Entry,
          {
            map: (v) => {
              mapped.push(v)
              return v
            }
          },
          () => c('div', {}, 'This is rendered content'),
        )
      )

      class App extends React.Component {
        render () {
          return (
            c(
              context.Root,
              {},
              c(Toast, {})
            )
          )
        }
      }

      const rendered = RectDOM.renderToString(
        c(App, {})
      )
      ok(rendered)
    }
  })
})

/* global describe, before, after, it */
