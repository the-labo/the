/**
 * Test for TheStyle.
 * Runs with mocha.
 */
'use strict'

const TheStyle = require('../shim/TheStyle')
const React = require('react')
const { ok, equal } = require('assert')
const { renderToStaticMarkup } = require('react-dom/server')

describe('the-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const element = React.createElement(
      TheStyle,
      `.body { color: #555; }`,
    )
    ok(element)
    equal(
      renderToStaticMarkup(element),
      '<style class="the-style">.body { color: #555; }</style>'
    )
  })

  it('Convert style string', () => {
    const styleString = TheStyle.styleString('.foo', {
      backgroundColor: 'green',
      color: 'white',
      maxWidth: 1024,
    })
    equal(styleString, `\n.foo {\n    background-color:green;\n    color:white;\n    max-width:1024px;\n}\n`)
  })

  it('styleStringFromStyles', () => {
    const styleString = TheStyle.styleStringFromStyles({
      '.foo': {
        color: 'white'
      }
    })
    equal(styleString, '\n.foo {\n    color:white;\n}\n')
  })

  it('With key frame', () => {
    equal(
      TheStyle.styleStringFromStyles({
        '@keyframes fpFadeInDown': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        }
      }), `@keyframes fpFadeInDown { \nfrom {\n    opacity:0;\n}\n \nto {\n    opacity:1;\n}\n}`
    )
  })

})

/* global describe, before, after, it */
