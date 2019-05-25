'use strict'
const theSetting = require('@the-/setting')

async function tryExample() {
  const setting = theSetting('.setting.json', {
    foo: 1,
  })

  setting.set({ foo: 2 })

  console.log(setting.get('foo')) // -> 2
}

tryExample().catch((err) => console.error(err))
