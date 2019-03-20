/**
 * Test for server.
 * Runs with mocha.
 */
'use strict'

const aport = require('aport')
const arequest = require('arequest')
const { equal, ok } = require('assert')
const createDB = require('../db/create')
const createServer = require('../server/create')

describe('server', () => {
  let port
  before(async () => {
    port = await aport()
  })

  after(() => {
  })

  it('Do test', async () => {
    const db = createDB({})
    const server = createServer({ db })
    await server.listen(port)
    {
      const { body } = await arequest(`http://localhost:${port}`)
      ok(body)
    }
    await server.close()
  })
})

/* global describe, before, after, it */
