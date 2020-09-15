'use strict'

/**
 * @file Test for TheDriverSequelize.
 * Runs with mocha.
 */
const { unlinkAsync } = require('asfs')
const { deepStrictEqual: deepEqual, ok, strictEqual: equal } = require('assert')
const {
  DataTypes: { DATE, NUMBER, OBJECT, REF, STRING },
} = require('clay-constants')
const TheDriverSequelize = require('../lib/TheDriverSequelize')
const resetMysqlDatabase = require('../misc/mysql/resetMysqlDatabase')

describe('the-driver-sequelize', function () {
  this.timeout(18000)
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const storage = `${__dirname}/../tmp/hoge-2.db`
    await unlinkAsync(storage).catch(() => null)

    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
      // logging: console.log,
    })
    ok(!driver.closed)
    driver.define('User', {
      icon: {
        type: STRING,
      },
      name: {
        required: false,
        type: STRING,
      },
    })
    await driver.drop('User')

    {
      const created = await driver.create('User', { name: 'u-01' })
      equal(created.name, 'u-01')

      {
        const one = await driver.one('User', created.id)
        equal(one.name, 'u-01')
      }

      {
        const listed = await driver.list('User', {})
        equal(listed.meta.total, 1)
        equal(listed.entities[0].id, created.id)
      }

      {
        const updated = await driver.update('User', created.id, {
          hoge: 'this is hoge',
          icon: '🍣🍺',
          name: null,
        })
        ok(!('hoge' in updated))
        equal(updated.id, created.id)
        equal(updated.icon, '🍣🍺')
        const one = await driver.one('User', created.id)
        ok(one.name === null)
      }

      {
        const destroyed = await driver.destroy('User', created.id)
        equal(destroyed, 1)
      }

      {
        const listed = await driver.list('User', {})
        equal(listed.meta.total, 0)
      }

      await driver.drop('User')
    }

    deepEqual(await driver.resources(), [{ domain: null, name: 'User' }])
    await driver.close()
    ok(driver.closed)
  })

  it('Multiple create', async () => {
    const storage = `${__dirname}/../tmp/hoge-2.db`
    await unlinkAsync(storage).catch(() => null)
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
      // logging: console.log,
    })

    driver.define('User', {
      a: { type: NUMBER },
      b: { type: NUMBER },
      c: { type: NUMBER },
    })
    {
      const user01 = await driver.create('User', { a: 1 })
      const user01updated = await driver.update('User', user01.id, { b: 2 })
      const user02 = await driver.create('User', { c: 3 })
      console.log('user01updated', user01updated)
      equal(user01updated.a, 1)
      equal(user01updated.b, 2)
      equal(user02.c, 3)
    }
    await driver.drop('User')
  })

  it('Lists', async () => {
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage: `${__dirname}/../tmp/list-test.db`,
    })
    await driver.define('Box', {
      name: { type: STRING },
    })
    await driver.drop('Box')
    const created01 = await driver.create('Box', { name: 'b01' })
    const created02 = await driver.create('Box', { name: 'b02' })
    equal((await driver.list('Box', { filter: { name: 'b02' } })).meta.total, 1)
    equal(
      (await driver.list('Box', { filter: { name: 'xxxx' } })).meta.total,
      0,
    )

    equal(
      (await driver.list('Box', { filter: { name: { $like: '%02%' } } })).meta
        .total,
      1,
    )

    await driver.list('Box', { filter: { name: { $like: '02' } } })

    equal(
      (
        await driver.list('Box', {
          filter: { $or: [{ name: { $like: '%02%' } }] },
        })
      ).meta.total,
      1,
    )

    equal(
      (await driver.list('Box', { filter: { __unknown__: 'xxxx' } })).meta
        .total,
      0,
    )

    equal(
      (await driver.list('Box', { filter: { name: ['b01', 'b03'] } })).meta
        .total,
      1,
    )

    equal(
      (await driver.list('Box', { sort: 'name' })).entities[0].id,
      created01.id,
    )
    equal(
      (await driver.list('Box', { sort: '-name' })).entities[0].id,
      created02.id,
    )

    ok(await driver.list('Box', { sort: '-__unknown_prop__' }))

    equal(
      (await driver.list('Box', { sort: '-$$at' })).entities[0].id,
      created02.id,
    )

    equal(
      (await driver.list('Box', { sort: '$$at' })).entities[0].id,
      created01.id,
    )

    equal(
      (
        await driver.list('Box', {
          filter: {
            $$at: { $gt: new Date() },
          },
        })
      ).entities.length,
      0,
    )
    equal(
      (
        await driver.list('Box', {
          filter: {
            $$at: { $lte: new Date() },
          },
        })
      ).entities.length,
      2,
    )
  })

  it('Using float', async () => {
    const storage = `${__dirname}/../tmp/float.db`
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    await unlinkAsync(storage).catch(() => null)

    driver.define('X', {
      lat: { type: NUMBER },
      lng: { type: NUMBER },
    })
    await driver.create('X', {
      lat: 35.67988848691441,
      lng: 139.68669891357425,
    })
    equal(
      (
        await driver.list('X', {
          filter: {
            lat: {
              $gte: 31.952162238024975,
              $lte: 37.95286091815649,
            },
          },
        })
      ).entities.length,
      1,
    )
    equal(
      (
        await driver.list('X', {
          filter: {
            lat: {
              $gte: 31.952162238024975,
              $lte: 34.95286091815649,
            },
          },
        })
      ).entities.length,
      0,
    )
    equal(
      (
        await driver.list('X', {
          filter: {
            lat: {
              $gte: -31.952162238024975,
              $lte: 40.95286091815649,
            },
          },
        })
      ).entities.length,
      1,
    )
  })

  it('Inject $$at', async () => {
    const storage = `${__dirname}/../tmp/inject-date.db`
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    driver.define('Ball', {
      name: { type: STRING },
    })
    await unlinkAsync(storage).catch(() => null)
    const d1 = await driver.create('Ball', {
      $$at: new Date('2018/12/12 16:00'),
      name: 'b1',
    })
    equal(d1.$$at - new Date('2018/12/12 16:00'), 0)
  })

  it('Sort properties', async () => {
    const storage = `${__dirname}/../tmp/sort-properties.db`
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    const p = 'abcdefghijklmn'.split('')
    await unlinkAsync(storage).catch(() => null)
    driver.define('X', {
      ...p.reduce(
        (reduced, k) => ({
          ...reduced,
          [k]: { type: NUMBER },
        }),
        {},
      ),
    })
    const a1 = await driver.create('X', { [p[1]]: 1, [p[3]]: 3, [p[5]]: 5 })
    const a2 = await driver.update('X', a1.id, { [p[4]]: 4 })
    equal(a2[p[4]], 4)
    const a22 = await driver.update('X', a1.id, { [p[4]]: 4 })
    equal(a22[p[4]], 4)
    const a3 = await driver.update('X', a1.id, { [p[2]]: 2 })
    deepEqual(
      Object.keys(a3).sort(),
      [
        'id',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        '$$as',
        '$$at',
        '$$num',
        '$$entity',
      ].sort(),
    )
  })

  it('Date between', async () => {
    const storage = `${__dirname}/../tmp/date-between.db`
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    await unlinkAsync(storage).catch(() => null)
    driver.define('Pin', {
      from: { type: DATE },
      to: { type: DATE },
    })
    await driver.create('Pin', {
      from: new Date('2018/12/11'),
      to: new Date('2018/12/15'),
    })
    await driver.create('Pin', {
      from: new Date('2018/12/13'),
      to: new Date('2018/12/19'),
    })
    await driver.create('Pin', {
      from: new Date('2018/12/24'),
      to: new Date('2018/12/29'),
    })
    equal(
      (
        await driver.list('Pin', {
          filter: { from: { $gt: new Date('2018/12/12') } },
        })
      ).entities.length,
      2,
    )
    equal(
      (
        await driver.list('Pin', {
          filter: {
            from: { $gt: new Date('2018/12/12') },
            to: { $lte: new Date('2018/12/20') },
          },
        })
      ).entities.length,
      1,
    )
  })

  it('List by ref', async () => {
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage: `${__dirname}/../tmp/list-ref-test.db`,
    })
    driver.define('Box', {
      group: { type: REF },
      v: { type: NUMBER },
    })
    driver.define('BoxGroup', {
      name: { type: STRING },
    })
    await driver.drop('Box')
    await driver.drop('BoxGroup')
    equal((await driver.list('Box')).entities.length, 0)
    equal((await driver.list('BoxGroup')).entities.length, 0)

    const group01 = await driver.create('BoxGroup', { name: 'bg01' })
    const group02 = await driver.create('BoxGroup', { name: 'bg02' })

    const box01 = await driver.create('Box', {
      group: { $ref: `BoxGroup#${group01.id}` },
    })
    const box02 = await driver.create('Box', {
      group: { $ref: `BoxGroup#${group02.id}` },
    })

    equal(box01.group.$ref, `BoxGroup#${group01.id}`)
    equal(box02.group.$ref, `BoxGroup#${group02.id}`)

    equal(
      (
        await driver.list('Box', {
          filter: { group: { $ref: `BoxGroup#${group01.id}` } },
        })
      ).entities[0].id,
      box01.id,
    )

    equal(
      (
        await driver.list('Box', {
          filter: { group: group01 },
        })
      ).entities[0].id,
      box01.id,
    )

    equal(
      (
        await driver.list('Box', {
          filter: { group: { $ref: `BoxGroup#${group02.id}` } },
        })
      ).entities[0].id,
      box02.id,
    )

    await driver.update('Box', box02.id, { v: 2 })

    await driver.update('Box', box01.id, { group: null })
    await driver.update('Box', box01.id, { group: null })
    await driver.update('Box', box01.id, { group: null })
    const one2 = await driver.one('Box', box01.id)
    equal(one2.group, null)
    equal(one2.$$num, 3)

    const [box03, box04] = await driver.createBulk('Box', [
      { group: { $ref: `BoxGroup#${group02.id}` } },
      { group: { $ref: `BoxGroup#${group02.id}` } },
    ])
    equal(box03.group.$ref, `BoxGroup#${group02.id}`)
    equal(box04.group.$ref, `BoxGroup#${group02.id}`)

    const onBulk = await driver.oneBulk('Box', [box01.id, box03.id])
    equal(Object.keys(onBulk).length, 2)
    equal(onBulk[box01.id].id, box01.id)
    equal(onBulk[box03.id].group.$ref, `BoxGroup#${group02.id}`)
  })

  it('Name with dot', async () => {
    const storage = `${__dirname}/../tmp/dot-name-test.db`
    await unlinkAsync(storage).catch(() => null)
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    driver.define('User', {
      'profile.name': { type: STRING },
    })
    await driver.drop('User')
    const created = await driver.create('User', { 'profile.name': 'やまだ' })
    equal(created['profile.name'], 'やまだ')
  })

  it('Remove unknown property', async () => {
    const storage = `${__dirname}/../tmp/remove-unknown.db`
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    await unlinkAsync(storage).catch(() => null)
    driver.define('Fire', {
      p1: { type: NUMBER },
      p2: { type: NUMBER },
      p3: { type: NUMBER },
      p4: { type: NUMBER },
    })
    await driver.drop('Fire')

    const f1 = await driver.create('Fire', { p1: 1, p2: 2 })
    const f2 = await driver.create('Fire', { p3: 3, p4: 4 })

    const f1One = await driver.one('Fire', f1.id)
    const f2One = await driver.one('Fire', f2.id)
    ok(f1One)
    ok(f2One)
  })

  it('Skip empty date', async () => {
    const storage = `${__dirname}/../tmp/skip-empty-date.db`
    await unlinkAsync(storage).catch(() => null)
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    driver.define('Box', {
      date: { type: DATE },
      name: { type: STRING },
      x: { type: NUMBER },
      y: { type: NUMBER },
    })
    await driver.drop('Box')
    const created01 = await driver.create('Box', {
      date: new Date('2018/11/10'),
      name: 'b01',
      x: 1,
      y: 2,
    })
    equal(created01.name, 'b01')
    const created02 = await driver.create('Box', {
      date: null,
      name: 'b02',
      x: 1,
      y: 3,
    })
    equal(created02.name, 'b02')
    const created03 = await driver.create('Box', {
      date: null,
      name: 'b03',
      x: 2,
      y: 3,
    })
    equal(created03.name, 'b03')
    equal(
      (
        await driver.list('Box', {
          filter: {
            date: {
              $gte: new Date('2018/11/08'),
              $lte: new Date('2018/11/11'),
              $ne: null,
            },
          },
        })
      ).entities.length,
      1,
    )

    equal(
      (await driver.list('Box', { filter: { x: 1, y: 2 } })).entities.length,
      (await driver.list('Box', { filter: { $and: [{ x: 1 }, { y: 2 }] } }))
        .entities.length,
    )

    const listOnlyName = await driver.list(
      'Box',
      {},
      {
        attributes: ['name'],
      },
    )
    equal(listOnlyName.entities[0].name, 'b01')
    equal('x' in listOnlyName.entities[0], false)
  })

  it('Add column', async () => {
    const storage = `${__dirname}/../tmp/add-column-date.db`
    await unlinkAsync(storage).catch(() => null)
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    driver.define('A', {
      x: { type: NUMBER },
      z: { maxLength: 32, type: STRING },
    })
    const a1 = await driver.create('A', { x: 1 })
    equal(a1.x, 1)
    driver.define('A', {
      x: { type: NUMBER },
      y: { type: NUMBER },
      z: { maxLength: 256, type: STRING },
    })
    const a2 = await driver.create('A', { x: 2, y: 3 })
    equal(a2.x, 2)
    equal(a2.y, 3)
    driver.define('A', {
      x: { type: STRING },
      y: { type: NUMBER },
    })

    driver.define('A', {
      x: { maxLength: 2024, type: STRING },
      y: { type: NUMBER },
      z: { maxLength: 2014, type: STRING },
    })
    const longX = new Array(1000).fill('x').join('')
    const a3 = await driver.create('A', { x: longX })
    equal(a3.x, longX)
    await driver.close()
  })

  it('mysql', async () => {
    const DB_ROOT_USER = 'root'
    const DB_ROOT_PASSWORD = 'root'
    const DB_USER = 'hoge'
    const DB_PASSWORD = 'fuge'
    const DATABASE = 'the_driver_sequelize_test'
    const DB_HOST = '127.0.0.1'

    await resetMysqlDatabase(DB_ROOT_USER, DB_ROOT_PASSWORD, {
      database: DATABASE,
      host: DB_HOST,
      password: DB_PASSWORD,
      username: DB_USER,
    })
    const driver = new TheDriverSequelize({
      database: DATABASE,
      dialect: 'mysql',
      host: DB_HOST,
      password: DB_PASSWORD,
      username: DB_USER,
    })
    driver.define('A', {
      b: { indexed: true, type: NUMBER },
      c: { indexed: true, type: NUMBER },
      x: { type: NUMBER },
      z: { maxLength: 32, type: STRING },
    })
    driver.define('B', {
      aId: {
        associate: ['A', { as: 'a' }],
        type: STRING,
      },
    })
    const a1 = await driver.create('A', { x: 1 })
    equal(a1.x, 1)
    driver.define('A', {
      c: { indexed: true, type: NUMBER },
      x: { type: NUMBER },
      y: { type: NUMBER },
      z: { maxLength: 1024, type: STRING },
    })
    const longZ = new Array(500).fill('123').join('')
    const a3 = await driver.create('A', { x: 3, z: longZ })
    equal(a3.z, longZ.slice(0, 1024))
    const a4 = await driver.one('A', a3.id)
    equal(a4.z, longZ.slice(0, 1024))

    {
      const created = await driver.createBulk('A', [
        ...new Array(100).fill(null).map((_, i) => ({ x: i })),
      ])
      equal(created.length, 100)
    }

    {
      const b1 = await driver.create('B', {
        aId: a1.id,
      })
      equal(b1.a.id, a1.id)
      const b1One = await driver.one('B', b1.id)
      equal(b1One.a.id, a1.id)
      equal(b1One.aId, a1.id)

      const b2 = await driver.create('B', {
        aId: a3.id,
      })

      const list = await driver.list('B', {
        filter: {
          'a.id': a1.id,
        },
      })
      equal(list.entities.length, 1)

      const list2 = await driver.list('B', {
        sort: ['-a.x'],
      })
      const list3 = await driver.list('B', {
        sort: ['a.x'],
      })
      equal(list2.entities[0].aId, a3.id)
      equal(list3.entities[0].aId, a1.id)
    }

    await driver.drop('A')
    await driver.drop('B')
    await driver.close()
  })
  it('mysql DATE type should support fractional seconds', async () => {
    const DB_ROOT_USER = 'root'
    const DB_ROOT_PASSWORD = 'root'
    const DB_HOST = '127.0.0.1'
    const DB_USER = 'hoge'
    const DB_PASSWORD = 'fuge'
    const DATABASE = 'the_driver_sequelize_testx'

    await resetMysqlDatabase(DB_ROOT_USER, DB_ROOT_PASSWORD, {
      database: DATABASE,
      host: DB_HOST,
      password: DB_PASSWORD,
      username: DB_USER,
    })
    const driver = new TheDriverSequelize({
      database: DATABASE,
      dialect: 'mysql',
      host: DB_HOST,
      password: DB_PASSWORD,
      username: DB_USER,
    })
    driver.define('Date', {
      date: { type: DATE },
      x: { type: NUMBER },
      y: { type: NUMBER },
      z: { maxLength: 1024, type: STRING },
    })

    const { date: dateA } = await driver.create('Date', {
      date: new Date('2019-01-01T00:00:00.000Z'),
    })
    const { date: dateB } = await driver.create('Date', {
      date: new Date('2019-01-01T00:00:00.100Z'),
    })
    ok(dateA.getTime() < dateB.getTime())

    await driver.drop('Date')
    await driver.close()
  })
  it('Multiple entity', async () => {
    const storage = `${__dirname}/../tmp/multiple-entity.db`
    await unlinkAsync(storage).catch(() => null)
    const driver = new TheDriverSequelize({
      dialect: 'sqlite',
      storage,
    })
    driver.define('A', {
      date: { type: DATE },
    })
    driver.define('B', {
      a: { type: OBJECT },
    })
    const a1 = await driver.create('A', { date: new Date('2019/04/04') })
    const a2 = await driver.create('A', { date: new Date('2019/04/05') })
    const b = await driver.create('B', { a: [a1, a2] })
    ok(b)
    ok(b.a[0])
    await driver.close()
  })
})

/* global describe, before, after, it */
