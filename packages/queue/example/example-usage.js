'use strict'
const { TheQueue } = require('@the-/queue')
const asleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function tryExample() {
  const queue = new TheQueue({
    autoStart: false,
  })
  const results = []
  queue.push(async () => {
    await asleep(100)
    results.push('hi')
  })
  queue.push(async () => {
    await asleep(0)
    results.push('yo')
  })
  console.log(results) // => []
  queue.start()
  await queue.wait() // Wait to consume all queues
  console.log(results) // => ['hi', 'yo'] // Executed sequentially
}

tryExample().catch((err) => console.error(err))
