'use strict'

/**
 * Test for TheDB.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
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

    const BResource = ({ define }) => define({})

    const db = new TheDB({
      env,
      resources: { A: AResource, B: BResource },
    })
    const {
      resources: { A, B },
    } = db
    const b01 = await B.create({ name: 'b01' })
    const b02 = await B.create({ name: 'b02' })
    await A.create({ b: b01 })
    await A.create({ b: b02 })
    equal(await A.count(), 2)

    await b01.destroy()
    await asleep(100)
    equal(await A.count(), 1)
    await db.close()
  })

  it('sequelize/Mysql', async () => {
    const DB_USER = 't01'
    const DB_PASSWORD = 't01'
    const DATABASE = 'the-db-test-sequelize123'
    const DB_HOST = '127.0.0.1'

    const env = {
      database: DATABASE,
      dialect: 'sequelize/mysql',
      host: DB_HOST,
      logging: console.log,
      password: DB_PASSWORD,
      username: DB_USER,
    }
    const db = new TheDB({
      env,
    })
    await db.setup()
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

    await db.drop()
    await db.close()
  })
})

/* global describe, before, after, it */
