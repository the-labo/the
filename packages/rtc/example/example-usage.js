'use strict'

const { TheRTC } = require('@the-/rtc')

async function tryExample() {
  const rtc = new TheRTC({
    stun: {
      url: 'stun:stun.l.google.com:19302',
    },
    topology: 'mesh',
    turn: {
      expiry: 86400,
      secret: 'xxxxxxxxxxxxxxxx',
      url: 'turn:your.turn.servers.here',
    },
  })

  const port = 3000
  await rtc.listen(port)
  console.log(`Example RTC Server listening: http://localhost:${port}`)
}

tryExample().catch((err) => console.error(err))
