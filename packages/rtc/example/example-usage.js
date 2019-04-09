'use strict'

const { TheRTC } = require('@the-/rtc')

async function tryExample() {
  const rtc = new TheRTC({
    stun: {
      url: 'stun:stun.l.google.com:19302'
    },
    turn: {
      url: 'turn:your.turn.servers.here',
      secret: 'xxxxxxxxxxxxxxxx',
      expiry: 86400
    },
    topology: 'mesh',
  })

  const port = 3000
  await rtc.listen(port)
  console.log(`Example RTC Server listening: http://localhost:${port}`)
}

tryExample().catch((err) => console.error(err))
