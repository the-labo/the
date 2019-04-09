'use strict'

async function waitChannelOpen(channel, options = {}) {
  const { prefix = 'TheRTCClient', timeout = 3 * 1000 } = options
  if (channel.readyState === 'open') {
    return channel
  }
  return new Promise((resolve, reject) => {
    const onOpen = () => {
      channel.removeEventListener('open', onOpen)
      resolve(channel)
      clearTimeout(timeoutTimer)
    }
    const channelName = channel.label
    channel.addEventListener('open', onOpen)
    const timeoutTimer = setTimeout(
      () =>
        reject(new Error(`[${prefix}] Failed to open channel: ${channelName}`)),
      timeout,
    )
  })
}

module.exports = waitChannelOpen