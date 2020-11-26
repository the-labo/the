/**
 * Test for ClientStatusPool.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal },
} = require('assert')
const { ClientStatuses } = require('../lib/constants')
const ClientStatusPool = require('../lib/helpers/ClientStatusPool')

describe('client-status-pool', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const pool = ClientStatusPool()
    const cid = 'c-01'
    const socketId = 's-01'
    {
      const status = pool.get(cid, socketId)
      equal(status, undefined)
    }
    {
      pool.init(cid, socketId)
      const status = pool.get(cid, socketId)
      equal(status, ClientStatuses.INITIALIZING)
    }
    {
      pool.ready(cid, socketId)
      const status = pool.get(cid, socketId)
      equal(status, ClientStatuses.READY)
    }
    {
      pool.finalize(cid, socketId)
      const status = pool.get(cid, socketId)
      equal(status, ClientStatuses.FINALIZING)
    }
    {
      pool.del(cid, socketId)
      const status = pool.get(cid, socketId)
      equal(status, undefined)
    }
  })
})

/* global describe, before, after, it */
