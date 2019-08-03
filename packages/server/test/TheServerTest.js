'use strict'

/**
 * Test for TheServer.
 * Runs with mocha.
 */
const aport = require('aport')
const arequest = require('arequest')
const asleep = require('asleep')
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
const msgpack = require('msgpack-lite')
const React = require('react')
const socketIOClient = require('socket.io-client')
const theClient = require('@the-/client')
const TheServer = require('../lib/TheServer')

describe('the-server', function() {
  this.timeout(32000)
  before(() => {})

  after(async () => {})

  it('Listen and Close', async function() {
    const port = await aport()
    const server = new TheServer({})

    await server.listen(port)
    await server.close()
  })

  it('Do Callback', async function() {
    const port = await aport()
    const server = new TheServer({})

    await server.listen(port)

    const socket = socketIOClient(
      `http://localhost:${port}/rpc?cid=1&via=client`,
    )

    const received = []
    socket.on('client:callback/1/jCtrl/onHoge', (data) => {
      received.push(msgpack.decode(data))
    })
    await new Promise((resolve, reject) => {
      socket.on('connect', () => resolve())
      socket.on('error', (e) => reject(e))
    })
    await asleep(100)

    server.handleCallback({
      cid: 1,
      controller: 'jCtrl',
      name: 'onHoge',
      values: { a: 1, b: true, c: 'J' },
    })
    await asleep(100)
    socket.close()
    await asleep(100)
    await server.close()
    deepEqual(received[0], { a: 1, b: true, c: 'J' })
  })

  it('The server', async function() {
    const port = await aport()

    const SayCtrl = ({ intercept }) => {
      intercept({
        controllerDidAttach() {
          console.log('Say did attach')
        },
        controllerMethodDidInvoke() {
          // console('did invoke', method, result)
        },
        controllerMethodWillInvoke() {
          this.foo = 'Foo'
          // console.log('will invoke', method, params)
        },
        controllerWillDetach() {
          // console.log('Say will detach')
        },
      })
      return {
        sayHi() {
          console.log('!foo', this.foo)
          return 'hi'
        },
      }
    }

    const FruitShopCtrl = ({ session }) => ({
      clear() {
        session.total = 0
      },
      getTotal() {
        return session.total || 0
      },
      hoge() {
        return 'hoge'
      },
      somethingWrong() {
        const error = new Error('Something is wrong!')
        throw error
      },
      async buy(name, amount) {
        const { total = 0 } = session
        session.total = total + amount
        // console.log('this.hoge', this.hoge())
        return { amount, name, total: session.total }
      },
    })

    const server = new TheServer({
      controllers: {
        fruitShop: FruitShopCtrl,
        say: SayCtrl,
      },
      inject: () => ({}),
    })

    await server.listen(port)
    await server.destroyAllSessions()
    {
      const client01 = theClient({ cid: 'client01', port })
      const client02 = theClient({ cid: 'client02', port })

      const fruitShop01 = await client01.use('fruitShop')
      const fruitShop02 = await client02.use('fruitShop')
      await fruitShop01.clear()
      await fruitShop02.clear()

      deepEqual(await fruitShop01.buy('orange', 100), {
        amount: 100,
        name: 'orange',
        total: 100,
      })

      deepEqual(await fruitShop02.buy('banana', 1), {
        amount: 1,
        name: 'banana',
        total: 1,
      })

      deepEqual(await fruitShop01.buy('orange', 400), {
        amount: 400,
        name: 'orange',
        total: 500,
      })

      equal(await fruitShop01.getTotal(), 500)

      {
        const caught = await fruitShop01.somethingWrong().catch((e) => e)
        ok(caught)
      }

      await client01.close()

      {
        // Same client again
        const client01 = theClient({ cid: 'client01', port })
        const fruitShop01 = await client01.use('fruitShop')
        const bought = await fruitShop01.buy('orange', 100)
        equal(bought.total, 600)
        await client01.close()
      }

      await server.destroyAllSessions()
      equal(await fruitShop02.getTotal(), 0)
      await client02.close()
    }
    {
      const { body, statusCode } = await arequest(
        `http://localhost:${port}/the/info`,
      )
      equal(statusCode, 200)
      ok(body.alive)
      ok(body.uptime)
      deepEqual(body.controllers, [
        {
          methods: {
            buy: { desc: 'buy' },
            clear: { desc: 'clear' },
            getTotal: { desc: 'getTotal' },
            hoge: { desc: 'hoge' },
            somethingWrong: { desc: 'somethingWrong' },
          },
          name: 'fruitShop',
        },
        {
          methods: {
            sayHi: { desc: 'sayHi' },
          },
          name: 'say',
        },
      ])
    }

    await server.close()
  })

  it('With endpoints and html', async () => {
    const port = await aport()
    const server = new TheServer({
      cacheDir: `${__dirname}/../tmp/testing-cache`,
      endpoints: {
        '/foo/bar/:id': (ctx) => {
          ctx.body = { id: ctx.params.id, rendered: true }
        },
        '/hoge/:key': {
          GET: (ctx) => {
            console.log('hoge')
            ctx.body = {
              key: ctx.params.key,
            }
          },
        },
      },
      html: () => React.createElement('html', { id: 'hoge' }),
    })
    await server.listen(port)
    {
      const { body, statusCode } = await arequest(
        `http://localhost:${port}/the/ping`,
      )
      equal(statusCode, 200)
      equal(body, 'pong')
    }

    {
      const { body, statusCode } = await arequest(
        `http://localhost:${port}/hoge/a.txt`,
      )
      equal(statusCode, 200)
      equal(body.key, 'a.txt')
    }
    {
      const times = []
      {
        const startAt = new Date()
        const { body, statusCode } = await arequest(
          `http://localhost:${port}/a?hoge`,
        )
        equal(statusCode, 200)
        equal(body, '<!DOCTYPE html><html id="hoge"></html>')
        times.push(new Date() - startAt)
      }

      {
        const startAt = new Date()
        const { body, statusCode } = await arequest(
          `http://localhost:${port}/a?hoge`,
        )
        equal(statusCode, 200)
        equal(body, '<!DOCTYPE html><html id="hoge"></html>')
        times.push(new Date() - startAt)
      }

      {
        const startAt = new Date()
        const { body, statusCode } = await arequest(
          `http://localhost:${port}/a?hoge`,
        )
        equal(statusCode, 200)
        equal(body, '<!DOCTYPE html><html id="hoge"></html>')
        times.push(new Date() - startAt)
      }

      // console.log('html times:', times)
    }

    {
      const { body, statusCode } = await arequest(
        `http://localhost:${port}/foo/bar/3`,
      )
      equal(statusCode, 200)
      deepEqual(body, { id: '3', rendered: true })
    }

    {
      const { body, statusCode } = await arequest(`http://localhost:${port}`)
      ok(body)
      ok(statusCode)
    }

    await server.close()
  })

  it('Controller lifecycle', async function() {
    const port = await aport()

    let wasCalledControllerDidAttach = false
    let wasCalledControllerWillDetach = false

    const LifecycleCtrl = ({ intercept }) => {
      intercept({
        controllerDidAttach() {
          wasCalledControllerDidAttach = true
        },
        controllerWillDetach() {
          wasCalledControllerWillDetach = true
        },
      })
      return {
        async hi() {
          return 'hi'
        },
      }
    }

    const server = new TheServer({
      controllers: {
        lifecycle: LifecycleCtrl,
      },
      inject: () => ({}),
    })

    await server.listen(port)

    await asleep(10)
    {
      const client01 = theClient({ cid: 'client01', port })
      const lifecycle = await client01.use('lifecycle')

      equal(await lifecycle.hi(), 'hi')
      await asleep(200)
      await client01.close()
    }

    await asleep(2000)
    ok(wasCalledControllerWillDetach)
    ok(wasCalledControllerDidAttach)

    await server.close()
  })

  it('Support stream', async () => {
    const port = await aport()
    const server = new TheServer({
      streams: {
        hogeStream: ({ handle, params }) => ({
          async *provide() {
            let count = Number(params.count)
            while (count > 0) {
              if (handle.closed) {
                return
              }

              yield { count }
              count--
              await asleep(1)
            }
            void handle.close()
          },
        }),
      },
    })
    await server.listen(port)

    {
      const cid = 'c0011'
      const sid = 's0011'
      const socket = socketIOClient(
        `http://localhost:${port}/rpc?cid=${cid}&via=client`,
      )

      const received = []
      socket.on(`stream:chunk/${sid}`, (d) => received.push(d))

      socket.emit('stream:open', {
        params: { count: 100 },
        sid,
        streamName: 'hogeStream',
      })
      await new Promise((resolve) => {
        socket.once('stream:did:close', () => resolve())
      })
      equal(received.length, 100)
      await socket.close()
    }
    await server.close()
  })

  it('Keep count', async () => {
    const port = await aport()

    const XCtrl = () => ({
      async waitAndSay(keyword) {
        await asleep(1000)
        return keyword
      },
    })

    const server = new TheServer({
      controllers: { xCtrl: XCtrl },
      rpcKeepDuration: 10,
    })
    await server.listen(port)
    {
      const client01 = theClient({ cid: 'client01', port })
      const xCtrl = await client01.use('xCtrl')
      await xCtrl.waitAndSay('Hei')
      await client01.close()
    }
    await asleep(100)
    await server.close()
  })

  it('A lot of Retrying', async () => {
    const port = await aport()

    const XCtrl = () => ({
      async waitAndSay(keyword) {
        await asleep(300)
        return keyword
      },
    })

    const server = new TheServer({
      controllers: { xCtrl: XCtrl },
      rpcKeepDuration: 10,
    })
    await server.listen(port)
    for (let i = 0; i < 10; i++) {
      const client01 = theClient({ cid: 'client01', port })
      const xCtrl = await client01.use('xCtrl')
      void xCtrl.waitAndSay('Hei')
      await asleep(10)
      void client01.close()
    }
    await asleep(1000)
    await server.close()
  })

  it('Client to server stream', async () => {
    const port = await aport()
    const server = new TheServer({
      streams: {
        xStream: ({ params }) => ({
          async *provide() {
            const count = Number(params.count)
            for (let i = 0; i < count; i++) {
              yield i
            }
          },
        }),
        yStream: () => ({
          async consume() {},
        }),
      },
    })
    await server.listen(port)
    {
      const client01 = theClient({ cid: 'client01', port })
      const xStream = await client01.stream('xStream', { count: 2 })
      const yStream = await client01.stream('yStream')
      equal(await xStream.pull(), 0)
      equal(await xStream.pull(), 1)
      equal(await xStream.pull(), void 0)
      await asleep(100)
      await yStream.push('hoge')
      await yStream.push('fuge')
      await yStream.pushEnd()
      await yStream.close()
      await client01.close()
    }
    await server.close()
  })

  it('Compare memory usage servers', async () => {
    for (const count of [1, 2, 4, 8]) {
      const servers = []
      const clients = []
      for (let i = 0; i < count; i++) {
        const port = await aport()
        const server = new TheServer({
          controllers: {
            xCtrl: () => ({
              sayYo() {},
            }),
          },
        })
        servers.push(server)
        await server.listen(port)

        const client = theClient({ cid: 'client01', port })
        clients.push(client)
        const xCtrl = await client.use('xCtrl')
        await xCtrl.sayYo()
      }
      await asleep(25)
      {
        console.log(`=== Memory usage of ${count} server instance === `)
        const used = process.memoryUsage()
        for (const [key, value] of Object.entries(used)) {
          console.log(
            `${key}: ${Math.round((value / 1024 / 1024) * 100) / 100} MB`,
          )
        }
      }
      await Promise.all(clients.map((client) => client.close()))
      await Promise.all(servers.map((server) => server.close()))
      await asleep(25)
    }
  })
})

/* global describe, before, after, it */
