'use strict'

/**
 * Test for TheResource.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { equal, ok },
} = require('assert')
const theDb = require('@the-/db')
const TheResource = require('../lib/TheResource')

describe('the-resource', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(new TheResource('hoge'))

    const db = theDb({
      dialect: 'memory',
    })

    let v = 0

    const User = db.load(TheResource, 'User')
    const History = db.load(TheResource.WriteOnce, 'History')
    User.invalidated = async () => ({
      vv: v,
    })

    equal(User.refOf('1'), 'User#1')
    equal(User.refOf({ id: '1' }), 'User#1')
    equal(User.refOf({ $ref: 'User#1' }), 'User#1')

    let listenCreated
    User.listenToCreate(({ created }) => {
      listenCreated = created
    })

    const user = await User.create({ name: 'foo' })

    await asleep(10)
    ok(listenCreated)
    equal(listenCreated.name, 'foo')

    const history = await History.create({})
    const { error } = await history
      .update({ foo: 'bar' })
      .catch((error) => ({ error }))
    ok(error)

    v = 2
    ok(await User.refresh(user))
    ok(!(await User.refresh(user)))
    v = 3
    ok(await User.refresh(user))
    equal(user.vv, 3)

    ok(User.emptyList())

    await User.refreshAll()
    await User.resaveAll()
    await db.close()
  })

  it('Create with queue', async () => {
    const db = theDb({
      dialect: 'memory',
    })

    const Box = db.load(TheResource, 'Box')
    void Box.createWithQueue({ name: 'b01' }, { timeout: 500 })
    equal(Box.creatingQueue.length, 1)
    const created = await Box.createWithQueue({ name: 'b01' })
    equal(Box.creatingQueue.length, 0)
    equal(created.name, 'b01')

    for (let i = 0; i < 100; i++) {
      void Box.createWithQueue({ name: `bb-${i}` }, { timeout: 100 })
    }
    const flushed = await Box.flushCreatingQueue()
    equal(flushed.length, 100)
  })
})

/* global describe, before, after, it */
