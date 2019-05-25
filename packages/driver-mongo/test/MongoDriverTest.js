'use strict'
/**
 * Test for MongoDriver.
 * Runs with mocha.
 */
const asleep = require('asleep')
const { equal, ok } = require('assert').strict
const clayDriverTests = require('clay-driver-tests')
const clayResource = require('clay-resource')
const MongoDriver = require('../lib/MongoDriver')

describe('mongo-driver', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const driver = new MongoDriver({
      database: 'test-the-driver-mongo',
    })
    try {
      await driver.drop('User')

      const created = await driver.create('User', {
        at: new Date(),
        name: 'user01',
      })
      equal(created.name, 'user01')
      ok(created.id)
      ok(created.at instanceof Date)

      {
        const one = await driver.one('User', created.id)
        equal(one.name, 'user01')
      }

      {
        const updated = await driver.update('User', created.id, {
          age: 33,
        })
        equal(updated.age, 33)
        ok(updated.id)
      }
      await driver.update('User', created.id, {})

      {
        const list = await driver.list('User')
        equal(String(list.entities[0].id), String(created.id))
        equal(list.meta.total, 1)
      }

      await driver.create('User', {
        at: new Date(),
        name: 'user02',
      })

      {
        const list = await driver.list('User', { sort: '-at' })
        equal(String(list.entities[1].id), String(created.id))
        equal(list.meta.total, 2)
      }

      {
        const destroyed = await driver.destroy('User', created.id)
        equal(destroyed, 1)
        const destroyed2 = await driver.destroy('User', created.id)
        equal(destroyed2, 0)
      }

      ok(await driver.resources())

      {
        const hoge01 = await driver.create('Hoge', {
          $$at: new Date(),
        })
        ok(hoge01.$$at)
      }

      {
        const group01 = await driver.create('Group', { name: 'group01' })
        const group02 = await driver.create('Group', { name: 'group02' })
        await driver.create('Entry', {
          group: { $ref: `Group#${group01}` },
          name: 'entry01',
        })
        await driver.create('Entry', {
          group: { $ref: `Group#${group01}` },
          name: 'entry02',
        })
        await driver.create('Entry', {
          group: { $ref: `Group#${group02}` },
          name: 'entry21',
        })
        equal(
          (await driver.list('Entry', {
            filter: [
              {
                group: {
                  $ref: `Group#${group01}`,
                },
              },
            ],
          })).entities.length,
          2,
        )

        equal(
          (await driver.list('Entry', {
            filter: [
              {
                group: [
                  {
                    $ref: `Group#${group01}`,
                  },
                ],
              },
            ],
          })).entities.length,
          2,
        )
      }
      await driver.drop('Entry')
      await driver.drop('Group')
      await asleep(100)
    } finally {
      await driver.close()
    }
  })

  it('Run clayDriverTests', async () => {
    const driver = new MongoDriver({
      database: 'test-the-driver-mongo-2',
    })
    await clayDriverTests.run(driver)
    await asleep(100)
    await driver.close()
  })

  it('From clayResource', async () => {
    const driver = new MongoDriver({
      database: 'test-the-driver-mongo-3',
    })
    const Hoge = clayResource.fromDriver(driver, 'Hoge')
    const hoge01 = await Hoge.create({ i: 0, name: 'hoge01' })
    await hoge01.update({ i: 1 })
    await driver.close()
  })
})

/* global describe, before, after, it */
