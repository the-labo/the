'use strict'

const { TheLock } = require('@the-/lock')
const { get } = require('@the-/window')

const mediaLock = new TheLock()

module.exports = async function createMediaStream (constrains = {}, options = {}) {
  const { screen } = options
  const mediaDevices = get('navigator.mediaDevices')
  if (!mediaDevices) {
    return null
  }

  return mediaLock.acquire('mediaDevices', async () => {
    if (screen) {
      return mediaDevices.getDisplayMedia(constrains)
    } else {
      return mediaDevices.getUserMedia(constrains)
    }
  })
}
