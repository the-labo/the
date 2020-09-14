/**
 * Test for TheLock.
 * Runs with mocha.
 */
'use strict'

const asleep = require('asleep')
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
const TheLock = require('../lib/TheLock')

describe('the-lock', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheLock)
    const lock = TheLock()
    const lockKey = 'key01'
    const pool = {
      get: async () => {
        await asleep(Math.random() * 100)
        return pool.value
      },
      set: async (value) => {
        await asleep(Math.random() * 300)
        pool.value = value
      },
      value: 1,
    }
    await Promise.all([
      lock.acquire(lockKey, async () => {
        const value = await pool.get()
        await pool.set(value * 2)
      }),
      lock.acquire(lockKey, async () => {
        const value = await pool.get()
        await pool.set(value * 2)
      }),
    ])
    equal(pool.value, 4)
  })

  it('A lot of promises', async () => {
    ok(TheLock)
    const lock = TheLock()
    await lock.acquire('k1', () => {})
    const promises = []
    const indexes = []
    for (let i = 0; i < 100; i++) {
      promises.push(
        lock.acquire('k1', async () => {
          await asleep(Math.random() * 10)
          indexes.push(i)
        }),
      )
    }
    await Promise.all(promises)
    deepEqual(
      indexes,
      Array.from({ length: 100 }).map((_, i) => i),
    )
  })

  it('Releases lock even when rejected', async () => {
    const lock = TheLock()
    void lock.acquire('k1', async () => {
      await asleep(1)
    })
    let error = null
    try {
      await lock.acquire('k1', async () => {
        throw new Error('error')
      })
    } catch (e) {
      error = e
    }
    ok(error)
    let called = false
    await lock.acquire('k1', async () => {
      called = true
    })
    equal(called, true)
  })
})

/* global describe, before, after, it */
