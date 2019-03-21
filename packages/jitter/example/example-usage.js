'use strict'

const { TheJitter } = require('@the-/jitter')

async function tryExample() {
  const jitter = new TheJitter({
    maxCount: 100,
    maxInterval: 1000,
  })

  async function doSomething(i) {
    console.log('Method called', i)
    const at = new Date()
    await jitter.handle(async () => {
      const took = new Date() - at
      console.log(`Jitter delay=${at}ms`, i)
      // called with some delay
      /* ... */
    })
    console.log('Method Finished', i)
  }

  for (let i = 0; i < 1000; i++) {
    void doSomething(i)
  }
}

tryExample().catch((err) => console.error(err))
