/**
 * Test for TheClient.
 * Runs with mocha.
 */
'use strict'

const aport = require('aport')
const asleep = require('asleep')
const { deepEqual, equal, ok } = require('assert')
const { TheServer } = require('@the-/server')
const TheClient = require('../lib/TheClient')

describe('the-client', () => {
  before(() => {})

  after(() => {})

  it('Do test', async function () {
    this.timeout(20 * 1000)
    ok(TheClient)

    const port = await aport()

    class FruitShopCtrl extends TheServer.Ctrl {
      buy(name, amount) {
        const { callbacks, session } = this
        const { total = 0 } = session
        session.total = total + amount
        const result = { amount, name, total: session.total }
        asleep(10)
        callbacks.onBuy(amount, session.total)
        return result
      }

      doWrong() {
        throw new Error('Something is wrong')
      }
    }

    const server = new TheServer({
      controllers: {
        fruitShop: FruitShopCtrl,
      },
    })
    await server.listen(port)

    const onBuyData = []

    {
      const client01 = TheClient.for('c1', { port })
      const client02 = TheClient.for('c2', { port })

      ok(client01.cid)
      ok(client02.cid)

      const { fruitShop: fruitShop02 } = await client02.useAll()
      const fruitShop01 = await client01.use('fruitShop', {
        debug: true,
      })
      ok(!fruitShop01.session)

      fruitShop01.setCallback({
        onBuy(...results) {
          onBuyData.push(results)
        },
      })

      {
        const controllers = await client01.useAll()
        deepEqual(Object.keys(controllers), ['fruitShop'])
        ok(controllers['fruitShop'])
      }

      deepEqual(await fruitShop01.buy('orange', 100), {
        amount: 100,
        name: 'orange',
        total: 100,
      })

      deepEqual(await fruitShop01.buy('orange', 400), {
        amount: 400,
        name: 'orange',
        total: 500,
      })

      deepEqual(await fruitShop02.buy('orange', 400), {
        amount: 400,
        name: 'orange',
        total: 400,
      })

      {
        const caught = await fruitShop01.doWrong().catch((e) => e)
        ok(caught)
      }

      await asleep(100)

      client01.pingPongAnd(() => console.log('pong!'), {
        interval: 10,
        retryMax: 3,
      })

      await asleep(100)

      const serverInfo = await client02.serverInfo()
      deepEqual(serverInfo.controllers, [
        {
          methods: {
            buy: { desc: 'buy' },
            doWrong: { desc: 'doWrong' },
          },
          name: 'fruitShop',
        },
      ])
      await client01.close()

      await asleep(10)

      await client02.close()
    }

    await server.close()

    await asleep(200)

    deepEqual(onBuyData, [[100, 100], [400, 500]])
  })

  it('Using stream api', async () => {
    const port = await aport()

    class CountdownStream extends TheServer.Stream {
      async * provide() {
        let count = Number(this.params.count)
        while (count > 0) {
          if (this.closed) {
            return
          }
          yield { count }
          count--
          await asleep(1)
        }
      }
    }

    const server = new TheServer({
      streams: {
        countdown: CountdownStream,
      },
    })
    await server.listen(port)

    const client01 = TheClient.for('c1', { port })

    {
      const stream = await client01.stream('countdown', { count: 2 })
      equal((await stream.pull()).count, 2)
      equal((await stream.pull()).count, 1)
      await stream.close()
    }

    {
      const client02 = TheClient.for('c1', { port })
      const stream = await client01.stream('countdown', { count: 2 })
      void stream.pull()
      await client02.close() // Close client before stream close
      await stream.close()
    }

    await client01.close()
    await server.close()
    await asleep(100)
  })

  it('Stream client to server', async () => {
    const port = await aport()
    const consumed = []

    class CountupStream extends TheServer.Stream {
      async consume(provided) {
        for await (const chunk of provided) {
          consumed.push(chunk)
        }
      }
    }

    const server = new TheServer({
      streams: {
        countup: CountupStream,
      },
    })
    await server.listen(port)

    const client01 = TheClient.for('c1', { port })
    {
      const stream = await client01.stream('countup')
      await stream.push('hoge')
      await stream.push('hoge1')
      await stream.push('hoge2')
      await asleep(0)
      await stream.pushEnd()
      await asleep(100)
      equal(consumed.length, 3)
      await stream.close()
    }
    await asleep(100)
    await client01.close()
    await server.close()
  })
})

/* global describe, before, after, it */
