'use strict'

const { TheStream } = require('@the-/stream')

async function tryExample() {
  class CountupStream extends TheStream {
    streamDidOpen() {
      this.counts = 0
    }

    streamWillClose() {
      console.log('Counts', this.counts)
    }

    // Consume values from `stream.push()`
    async consume(provided) {
      for await (const chunk of provided) {
        console.log('pushed', chunk)
        this.counts++
      }
    }

    // Provide values for `stream.pull()`
    async *provide() {
      do {
        yield this.counts--
        console.log('pulled', this.counts)
      } while (this.counts > 0)
    }
  }

  const stream = new CountupStream({})

  await stream.open()

  for (let i = 0; i < 100; i++) {
    await stream.push(i * Math.random())
  }

  console.log(await stream.pull())

  await stream.close()
}

tryExample().catch((err) => console.error(err))
