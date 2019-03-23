/**
 * Test for asStyleData.
 * Runs with mocha.
 */
'use strict'

const asStyleData = require('../lib/asStyleData')
const { ok, deepEqual } = require('assert')

describe('as-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('As style data', () => {
    const data = asStyleData('.foo', {
      '.foo-inner': {
        display: 'block',
        '.bar': {
          text: 'green'
        }
      },
      '&:hover,&:active': {
        opacity: 0.5
      },
      '.foo-inner,.bar-inner': {
        background: 'green',
      }

    })
    ok(data)
    deepEqual(data, {
      '.foo:hover': { opacity: 0.5 },
      '.foo:active': { opacity: 0.5 },
      '.foo .bar-inner': { background: 'green' },
      '.foo .foo-inner': { display: 'block', background: 'green' },
      '.foo .foo-inner .bar': { text: 'green' }
    })
  })

  it('More complex data', () => {
    let data = asStyleData('.the-button-group', {
      '&': {
        display: 'flex',
        margin: '8px 0',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      '&.the-button-group-collapsed': {
        flexWrap: 'nowrap',
        '.the-button': {
          margin: '0 -1px 0 0',
          borderRadius: 0,
          borderBottom: 'none',
          '&:first-child': {
            borderLeft: 'none',
            margin: '0'
          },
          '&:last-child': {
            borderRight: 'none'
          }
        }
      }
    })
    deepEqual(data, {
      '.the-button-group': {
        display: 'flex',
        margin: '8px 0',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      '.the-button-group.the-button-group-collapsed': { flexWrap: 'nowrap' },
      '.the-button-group.the-button-group-collapsed .the-button': {
        margin: '0 -1px 0 0',
        borderRadius: 0,
        borderBottom: 'none'
      },
      '.the-button-group.the-button-group-collapsed .the-button:first-child': { borderLeft: 'none', margin: '0' },
      '.the-button-group.the-button-group-collapsed .the-button:last-child': { borderRight: 'none' }
    })
  })
})

/* global describe, before, after, it */
