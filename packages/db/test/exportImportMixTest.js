'use strict'
/**
 * Test for exportImportMix.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { equal },
} = require('assert')
const { TheResource } = require('@the-/resource')
const TheDB = require('../lib/TheDB')

describe('export-import-mix', function() {
  this.timeout(200000)
  let db

  before(async () => {
    const storage = `${__dirname}/../tmp/exp-imp-test/test.db`
    db = new TheDB({
      env: {
        dialect: 'memory',
        storage,
      },
    })
    await db.drop()

    class UserResource extends TheResource {
      static get policy() {
        return {
          name: { type: 'STRING' },
        }
      }
    }

    db.load(UserResource, 'User')
  })

  after(async () => {
    db && (await db.drop())
  })

  it('Do test', async () => {
    const {
      resources: { User },
    } = db

    const DATA_COUNT = 123

    const users = new Array(DATA_COUNT)
      .fill(null)
      .map((_, i) => ({ name: String(i) }))
    await User.createBulk(users)

    const dataDir = `${__dirname}/../tmp/exp-imp-test/data`

    await db.export(dataDir)
    await asleep(100)
    await User.drop()
    await asleep(100)
    await db.import(dataDir)
    await asleep(100)

    equal(await User.count(), DATA_COUNT)

    await asleep(100)
  })
})

/* global describe, before, after, it */
