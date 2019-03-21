'use strict'

const theSeed = require('@the-/seed')

async function tryExample() {
  const seed = theSeed('ja', {
    vars: {
      /* ... */
    },
  })
  const users = seed.explode(
    {
      name: '#{name.firstName()}',
    },
    100,
  )

  console.log(users) // -> [ username: 'xxxxx', /* ... */ ]
}

tryExample().catch((err) => console.error(err))
