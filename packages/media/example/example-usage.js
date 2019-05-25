'use strict'
const { TheMedia } = require('@the-/media')

async function tryExample() {
  const media = new TheMedia({
    audio: true,
    video: false,
  })

  await media.start()
}

tryExample().catch((err) => console.error(err))
