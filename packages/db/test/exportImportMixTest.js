/**
 * Test for exportImportMix.
 * Runs with mocha.
 */
'use strict'

const asleep = require('asleep')
const { equal } = require('assert')
const { TheResource } = require('the-resource-base')
const TheDB = require('../lib/TheDB')

describe('export-import-mix', function() {
  this.timeout(200000)
  let db

  before(async () => {
    const storage = `${__dirname}/../tmp/exp-imp-test/test.db`
    db = new TheDB({
      env: {
        dialect: 'rdb/sqlite',
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
    await db.drop()
  })

  it('Do test', async () => {
    const { User } = db.resources

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
