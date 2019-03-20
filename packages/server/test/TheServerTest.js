/**
 * Test for TheServer.
 * Runs with mocha.
 */
'use strict'

const TheServer = require('../lib/TheServer')
const { ok, equal, deepEqual } = require('assert').strict
const arequest = require('arequest')
const asleep = require('asleep')
const msgpack = require('msgpack-lite')
const aport = require('aport')
const theClient = require('the-client')
const { TheNotAcceptableError } = require('the-error')
const React = require('react')
const socketIOClient = require('socket.io-client')

describe('the-server', function () {
  this.timeout(32000)
  before(() => {
  })

  after(async () => {
  })

  it('Listen and Close', async function () {
    const port = await aport()
    const server = new TheServer({})

    await server.listen(port)
    await server.close()
  })

  it('Do Callback', async function () {
    const port = await aport()
    const server = new TheServer({})

    await server.listen(port)

    const socket = socketIOClient(`http://localhost:${port}/rpc?cid=1&via=client`)

    const received = []
    socket.on(`client:callback/1/jCtrl/onHoge`, (data) => {
      received.push(msgpack.decode(data))
    })
    await new Promise((resolve, reject) => {
      socket.on('connect', () => resolve())
      socket.on('error', (e) => reject(e))
    })
    await asleep(100)

    server.handleCallback({
      cid: 1,
      name: 'onHoge',
      values: { a: 1, b: true, c: 'J' },
      controller: 'jCtrl'
    })
    await asleep(100)
    socket.close()
    await asleep(100)
    await server.close()
    deepEqual(received[0], { a: 1, b: true, c: 'J' })
  })

  it('The server', async function () {
    const port = await aport()

    class SayCtrl extends TheServer.Ctrl {
      sayHi() {
        console.log('!foo', this.foo)
        return 'hi'
      }

      controllerDidAttach() {
        console.log('Say did attach')
      }

      controllerWillDetach() {
        // console.log('Say will detach')
      }

      controllerMethodWillInvoke(method, params) {
        this.foo = 'Foo'
        // console.log('will invoke', method, params)
      }

      controllerMethodDidInvoke(method, params, result) {
        // console('did invoke', method, result)
      }
    }

    class FruitShopCtrl extends TheServer.Ctrl {
      async buy(name, amount) {
        const { app, client, session } = this
        let { total = 0 } = session
        session.total = total + amount
        // console.log('this.hoge', this.hoge())
        return { name, amount, total: session.total }
      }

      somethingWrong() {
        const error = new TheNotAcceptableError('Something is wrong!')
        throw error
      }

      hoge() {
        return 'hoge'
      }

      getTotal() {
        return this.session.total || 0
      }

      clear() {
        this.session.total = 0
      }

      async callSayHi() {
        const say = await this.useController('say')
        const hi = await say.sayHi()
        await asleep(300)
        return hi
      }
    }

    const server = new TheServer({
      injectors: {
        store: () => ({ isStore: true })
      },
      controllers: {
        'fruitShop': FruitShopCtrl,
        'say': SayCtrl
      }
    })

    await server.listen(port)
    await server.destroyAllSessions()
    {
      const client01 = theClient({ port, cid: 'client01' })
      const client02 = theClient({ port, cid: 'client02' })

      const fruitShop01 = await client01.use('fruitShop')
      const fruitShop02 = await client02.use('fruitShop')

      await fruitShop01.clear()
      await fruitShop02.clear()

      deepEqual(
        await fruitShop01.buy('orange', 100),
        { name: 'orange', amount: 100, total: 100 }
      )

      deepEqual(
        await fruitShop02.buy('banana', 1),
        { name: 'banana', amount: 1, total: 1 }
      )

      deepEqual(
        await fruitShop01.buy('orange', 400),
        { name: 'orange', amount: 400, total: 500 }
      )

      equal(
        await fruitShop01.getTotal(),
        500,
      )

      {
        const caught = await fruitShop01.somethingWrong().catch((e) => e)

        equal(caught.name, 'NotAcceptableError')
      }

      equal(
        await fruitShop01.callSayHi(),
        'hi'
      )

      await client01.close()

      {
        // Same client again
        const client01 = theClient({ port, cid: 'client01' })
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
      const { body, statusCode } = await arequest(`http://localhost:${port}/the/info`)
      equal(statusCode, 200)
      ok(body.alive)
      ok(body.uptime)
      deepEqual(body.controllers, [
        {
          'methods': {
            'buy': { desc: 'buy' },
            'callSayHi': { desc: 'callSayHi' },
            'clear': { desc: 'clear' },
            'getTotal': { desc: 'getTotal' },
            'hoge': { 'desc': 'hoge' },
            'somethingWrong': { desc: 'somethingWrong' },
          },
          'name': 'fruitShop',
        },
        {
          'methods': {
            'sayHi': { desc: 'sayHi' },
          },
          'name': 'say',
        }
      ])
    }

    await server.close()

  })

  it('With endpoints and html', async () => {
    const port = await aport()
    const server = new TheServer({
      endpoints: {
        '/foo/bar/:id': (ctx) => {
          ctx.body = { rendered: true, id: ctx.params.id }
        },
        '/hoge/:key': {
          GET: (ctx) => {
            console.log('hoge')
            ctx.body = {
              key: ctx.params.key,
            }
          }
        }
      },
      html: ({}) => React.createElement('html', { id: 'hoge' }),
      cacheDir: `${__dirname}/../tmp/testing-cache`
    })
    await server.listen(port)

    {
      {
        const { body, statusCode } = await arequest(`http://localhost:${port}/the/ping`)
        equal(statusCode, 200)
        equal(body, 'pong')
      }
    }

    {
      const { body, statusCode } = await arequest(`http://localhost:${port}/hoge/a.txt`)
      equal(statusCode, 200)
      equal(body.key, 'a.txt')
    }
    {
      const times = []
      {
        const startAt = new Date()
        let { body, statusCode } = await arequest(
          `http://localhost:${port}/a?hoge`
        )
        equal(statusCode, 200)
        equal(body, '<!DOCTYPE html><html id="hoge"></html>')
        times.push(new Date() - startAt)
      }

      {
        const startAt = new Date()
        let { body, statusCode } = await arequest(
          `http://localhost:${port}/a?hoge`
        )
        equal(statusCode, 200)
        equal(body, '<!DOCTYPE html><html id="hoge"></html>')
        times.push(new Date() - startAt)
      }

      {
        const startAt = new Date()
        let { body, statusCode } = await arequest(
          `http://localhost:${port}/a?hoge`
        )
        equal(statusCode, 200)
        equal(body, '<!DOCTYPE html><html id="hoge"></html>')
        times.push(new Date() - startAt)
      }

      // console.log('html times:', times)
    }

    {
      let { body, statusCode } = await arequest(
        `http://localhost:${port}/foo/bar/3`
      )
      equal(statusCode, 200)
      deepEqual(body, { rendered: true, id: '3' })
    }

    {
      let { body, statusCode } = await arequest(
        `http://localhost:${port}`
      )
    }

    await server.close()
  })

  it('Controller lifecycle', async function () {
    const port = await aport()

    let wasCalledControllerDidAttatch = false
    let wasCalledControllerWillDetach = false

    class LifecycleCtrl extends TheServer.Ctrl {
      controllerDidAttach() {
        wasCalledControllerDidAttatch = true
      }

      controllerWillDetach() {
        wasCalledControllerWillDetach = true
      }

      async hi() {
        return 'hi'
      }
    }

    const server = new TheServer({
      injectors: {
        store: () => ({ isStore: true })
      },
      controllers: {
        'lifecycle': LifecycleCtrl,
      }
    })

    await server.listen(port)

    await asleep(10)
    {
      let client01 = theClient({ cid: 'client01', port })
      const lifecycle = await client01.use('lifecycle')

      equal(await lifecycle.hi(), 'hi')
      await asleep(200)
      await client01.close()
    }

    await asleep(2000)
    ok(wasCalledControllerDidAttatch)

    await server.close()
  })

  it('Support stream', async () => {
    const port = await aport()
    const server = new TheServer({
      streams: {
        hogeStream: class extends TheServer.Stream {
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
            void this.close()
          }
        }
      }
    })
    await server.listen(port)

    {
      const cid = 'c0011'
      const sid = 's0011'
      const socket = socketIOClient(`http://localhost:${port}/rpc?cid=${cid}&via=client`)

      const received = []
      socket.on(`stream:chunk/${sid}`, (d) => received.push(d))

      socket.emit('stream:open', {
        streamName: 'hogeStream',
        sid,
        params: { count: 100 }
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

    class XCtrl extends TheServer.Ctrl {
      async waitAndSay(keyword) {
        await asleep(1000)
        return keyword
      }
    }

    const server = new TheServer({
      controllers: { xCtrl: XCtrl },
      rpcKeepDuration: 10,
    })
    await server.listen(port)
    {
      const client01 = theClient({ port, cid: 'client01' })
      const xCtrl = await client01.use('xCtrl')
      await xCtrl.waitAndSay('Hei')
      await client01.close()
    }
    await asleep(100)
    await server.close()
  })

  it('A lot of Retrying', async () => {
    const port = await aport()

    class XCtrl extends TheServer.Ctrl {
      async waitAndSay(keyword) {
        await asleep(300)
        return keyword
      }
    }

    const server = new TheServer({
      controllers: { xCtrl: XCtrl },
      rpcKeepDuration: 10,
    })
    await server.listen(port)
    for (let i = 0; i < 10; i++) {
      const client01 = theClient({ port, cid: 'client01' })
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
        xStream: class extends TheServer.Stream {
          async * provide() {
            let count = Number(this.params.count)
            for (let i = 0; i < count; i++) {
              yield i
            }
          }
        },
        yStream: class extends TheServer.Stream {
          async consume(chunks) {

          }
        }
      }
    })
    await server.listen(port)
    {
      const client01 = theClient({ port, cid: 'client01' })
      const xStream = await client01.stream('xStream', { count: 2 })
      const yStream = await client01.stream('yStream')
      equal(await xStream.pull(), 0)
      equal(await xStream.pull(), 1)
      equal(await xStream.pull(), void (0))
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
            xCtrl: class XCtrl extends TheServer.Ctrl {
              sayYo() {}
            }
          }
        })
        servers.push(server)
        await server.listen(port)

        const client = theClient({ port, cid: 'client01' })
        clients.push(client)
        const xCtrl = await client.use('xCtrl')
        await xCtrl.sayYo()
      }
      await asleep(25)
      {
        console.log(`=== Memory usage of ${count} server instance === `)
        const used = process.memoryUsage()
        for (const [key, value] of Object.entries(used)) {
          console.log(`${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} MB`)
        }
      }
      await Promise.all(clients.map((client) => client.close()))
      await Promise.all(servers.map((server) => server.close()))
      await asleep(25)
    }
  })

})

/* global describe, before, after, it */
