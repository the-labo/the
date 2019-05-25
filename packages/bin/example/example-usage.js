'use strict'
const theBin = require('@the-/bin')

async function tryExample() {
  const pon = theBin('pon', {
    guide: 'try `npm i pon -g`',
  })
  await pon.throwIfNotExists()
  pon('build')
}

tryExample().catch((err) => console.error(err))
