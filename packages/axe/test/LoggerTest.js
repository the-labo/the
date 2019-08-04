/**
 * Test for Logger.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const Logger = require('../lib/Logger')

describe('logger', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(Logger)
    const sampleIssue = {
      violation: {
        description:
          'Ensures each HTML document contains a non-empty <title> element',
        help: 'Documents must have <title> element to aid in navigation',
        helpUrl:
          'https://dequeuniversity.com/rules/axe/3.3/document-title?application=axeAPI',
        id: 'document-title',
        impact: 'serious',
        nodes: [
          {
            all: [],
            any: [
              {
                data: null,
                id: 'doc-has-title',
                impact: 'serious',
                message: 'Document does not have a non-empty <title> element',
                relatedNodes: [],
              },
            ],
            html: '<html>',
            impact: 'serious',
            none: [],
            target: ['html'],
          },
        ],
        tags: ['cat.text-alternatives', 'wcag2a', 'wcag242'],
      },
    }
    const logger = new Logger()
    logger.logIssue(sampleIssue)
  })
})

/* global describe, before, after, it */
