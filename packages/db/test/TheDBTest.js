'use strict'

/**
 * Test for TheDB.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
const utf8 = require('utf8')
const { TheRefresher } = require('@the-/refresher')
const {
  DataTypes: { ENTITY, STRING },
} = require('@the-/resource')
const TheDB = require('../lib/TheDB')

describe('the-db', function () {
  process.env.ROOT_PASSWORD = process.env.CI ? '' : 'root'
  this.timeout(40000)
  before(() => {})

  after(() => {})

  it('The db', async () => {
    const db = new TheDB({
      env: {
        dialect: 'memory',
      },
      hooks: {
        Hoge: () => ({
          onCreate(created) {
            ok(created)
          },
        }),
      },
      plugins: {
        foo: () => () => 'foo',
      },
      resources: {
        Hoge: ({ define }) => define({}),
      },
    })

    db.on('close', () => {
      console.log('DB Closed')
    })

    const UserResource = ({ define }) =>
      define({
        passwordHash: { type: 'STRING' },
        username: { type: 'STRING', unique: true },
      }, {
        hooks: {
          onCreate(created) {
            console.log('created', created)
          },
          onUpdate(updated) {
            console.log('updated', updated)
          },
          outbound(attributes) {
            return attributes
          },
        },
        interceptors: {
          inbound(attributes) {
            const digest = (password) => password.slice(0, 1)
            attributes.passwordHash = digest(attributes.password)
            delete attributes.password
            return attributes
          },
        },
      })
    db.load(UserResource, 'User')

    const {
      resources: { User },
    } = db

    const user = await User.create({ password: 'hogehoge', username: 'foo' })
    equal(typeof user.id, 'string')
    equal(user.username, 'foo')
    equal(user.passwordHash, 'h')

    equal(user.$$as, 'User')
    ok(user.$$at)

    {
      const thrown = await User.create({
        password: 'hogehoge2',
        username: 'foo',
      }).catch((e) => e)
      ok(thrown)
    }

    {
      const dumped = await db.dump(`${__dirname}/../tmp/testing-dump`)
      ok(dumped)
    }

    {
      const called = []
      const handlers = {
        async '1.1.0'(db) {
          called.push('1.1.0')
          await db.updateVersion('2.0.0')
        },
        async '2.0.0'(db) {
          called.push('2.0.0')
          await db.updateVersion('3.0.0')
        },
        async none(db) {
          called.push('none')
          await db.updateVersion('1.1.0')
        },
      }
      ok(await db.migrate(handlers))
      ok(await db.migrate(handlers))
      ok(await db.migrate(handlers))
      ok(!(await db.migrate(handlers)))
      deepEqual(called, ['none', '1.1.0', '2.0.0'])
    }

    await asleep(100)

    for (let i = 0; i < 10; i++) {
      await db.resource('Ball').create({ name: `ball-${i}` })
    }

    await asleep(300)

    equal(db.plugins.foo(), 'foo')

    await db.drop()
    await db.close()
  })

  it('Use refresh loop', async () => {
    const db = new TheDB({})

    const UserResource = ({ define }) => define({})

    db.load(UserResource, 'User')

    const {
      resources: { User },
    } = db
    const refresher = new TheRefresher(
      (entity) => {
        refreshed.push(entity)
      },
      { interval: 10 },
    )
    const refreshed = []
    await refresher.start()

    const [user01, user02] = await User.createBulk([
      { name: 'user01' },
      { name: 'user02' },
      { name: 'user03' },
    ])

    refresher.request(user01)
    refresher.request(user02)

    await asleep(250)

    await refresher.stop()

    equal(refreshed.length, 2)

    await db.close()
  })

  it('Invalidate mix', async () => {
    const env = {
      dialect: 'memory',
      refreshInterval: 10,
    }
    const db = new TheDB({ env })

    const ArticleResource = ({ define }) => {
      const Article = define({
        starCount: { default: () => 0, type: 'NUMBER' },
      })
      Object.assign(Article, {
        async refresh(entity) {
          const {
            db: {
              resources: { Star },
            },
          } = this
          await entity.update({
            starCount: await Star.count({ target: entity }),
          })
        },
      })
      return Article
    }

    const StarResource = ({ define }) =>
      define({
        target: { type: 'ENTITY' },
      })

    const Article = db.load(ArticleResource, 'Article')
    const Star = db.load(StarResource, 'Star')

    const article01 = await Article.create({ name: 'a01' })
    await Star.create({ target: article01 })

    await db.invalidate(article01.toRef())

    await db.waitToRefresh(article01.toRef())
    await asleep(1000)
    await article01.sync()
    equal(article01.starCount, 1)
  })

  it('Cascade', async () => {
    const env = {
      dialect: 'memory',
      refreshInterval: 10,
    }

    const AResource = ({ define }) =>
      define({}, {
        cascaded: {
          B: (b) => ({ b }),
        },
      })

    const BResource = ({ define }) => define({}, {})

    const CResource = ({ define }) =>
      define({
        bId: {
          associate: ['B', { as: 'b' }],
          type: STRING,
        },
        dId: {
          associate: ['D', { as: 'd' }],
          type: STRING,
        },
      }, {
        cascaded: {
          B: (b) => ({ bId: b.id }),
          D: (d) => ({ dId: d.id }),
        },
        interceptors: {
          inbound: (attributes) => attributes,
          outbound: (attributes) => attributes,
        },
      })

    const DResource = ({ define }) =>
      define({}, {
        interceptors: {
          inbound: (attributes) => attributes,
          outbound: (attributes) => attributes,
        },
      })

    const db = new TheDB({
      env,
      resources: { A: AResource, B: BResource, C: CResource, D: DResource },
    })
    const {
      resources: { A, B, C, D },
    } = db
    const b01 = await B.create({ name: 'b01' })
    const b02 = await B.create({ name: 'b02' })
    await A.create({ b: b01 })
    await A.create({ b: b02 })
    equal(await A.count(), 2)

    await b01.destroy()
    await asleep(100)
    equal(await A.count(), 1)

    const d01 = await D.create({ name: 'd01' })
    const b03 = await B.create({ name: 'b03' })
    const c = await C.create({ dId: d01.id, bId: b03.id })
    await d01.destroy()
    equal(await C.one(c.id), null)

    await db.close()
  })
})

describe('sequelize/mysql', function () {
  this.timeout(40000)
  const DB_USER = 't01'
  const DB_PASSWORD = 't01'
  const DATABASE = 'the-db-test-sequelize123'
  const DB_HOST = '127.0.0.1'
  const env = {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    database: DATABASE,
    dialect: 'sequelize/mysql',
    host: DB_HOST,
    logging: console.log,
    password: DB_PASSWORD,
    username: DB_USER,
  }
  let db
  beforeEach(async () => {
    db = new TheDB({
      env,
    })
    await db.setup()
  })

  afterEach(async () => {
    await db.drop()
    await db.close()
  })

  it('Do test', async () => {
    await db.exec('SHOW TABLES')

    const UserResource = ({ define }) =>
      define({
        name: { type: STRING },
      }, {
        async invalidated(user) {
          return {
            profile: await Profile.first({ user }),
          }
        },
      })

    const ProfileResource = ({ define }) =>
      define({
        'foo.bar': { type: STRING },
        name: { type: STRING },
        user: { type: ENTITY },
      }, {
        indices: [['name', 'user']],
      })

    const User = db.load(UserResource, 'User')
    const Profile = db.load(ProfileResource, 'Profile')
    const user01 = await User.create({ name: 'user01' })
    ok(user01.id)
    await User.update(user01.id, { name: 'user01-updated' })

    const profile01 = await Profile.create({
      'foo.bar': 'This is foo bar',
      name: '🍣🍺',
      user: user01,
    })
    ok(profile01.user)
    equal(profile01.name, '🍣🍺')
    equal(profile01['foo.bar'], 'This is foo bar')

    await User.refresh(user01)

    await db.transaction(async (transaction) => {
      await User.create({ name: 'x01' }, { transaction })
    })

    await db.invalidate(user01)
  })

  it('Migration v20 -> v21', async () => {
    const UserResource = ({ define }) =>
      define({
        name: { type: STRING },
      })
    const legacy = new TheDB({
      enableLegacyEncoding: true,
      env: {
        ...env,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    })
    await legacy.setup()
    const UserLegacy = legacy.load(UserResource, 'User')
    await UserLegacy.createBulk([
      { name: 'user' },
      { name: 'ユーザー' },
      { name: '🍣🍺' },
    ])

    const User = db.load(UserResource, 'User')
    {
      // レガシーなデータに対して日本語で検索できない
      const user1 = await User.first({ name: 'user' })
      ok(user1)
      const user2 = await User.first({ name: 'ユーザー' })
      ok(!user2)
    }

    // Migration
    await db.exec(
      'alter table User convert to character set utf8mb4 collate utf8mb4_unicode_ci;',
    )
    // UserLegacy は使わない。途中から開始すると utf8 デコード前とデコード後のデータが混在するため。
    await User.each(async (user) => {
      if (typeof user.name === 'string') {
        try {
          user.name = utf8.decode(user.name)
        } catch (e) {
          // give up
          console.error(e)
        }
      }

      await User.update(user.id, user, { allowReserved: true })
    })

    {
      // マイグレーション後は検索できる
      const user1 = await User.first({ name: 'user' })
      ok(user1)
      const user2 = await User.first({ name: 'ユーザー' })
      ok(user2)
      const user3 = await User.first({ name: '🍣🍺' })
      ok(user3)
    }

    await legacy.close()
  })
})

/* global describe, before, beforeEach, after, afterEach, it */
