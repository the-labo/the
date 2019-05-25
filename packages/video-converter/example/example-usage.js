'use strict'
const { TheVideoConverter } = require('@the-/video-converter')

async function tryExample() {
  const converter = new TheVideoConverter()
  await converter.convertIntoMP4('src01.wav', 'dest01.mp4')
}

tryExample().catch((err) => console.error(err))
