'use strict'
const { createChannels } = require('drone-scope-channels')
const processName = require('./processName')
const { FULL, THUMBNAIL } = processName
const {
  env: { CHANNEL_SIZE },
} = process
if (!CHANNEL_SIZE) {
  throw new Error('Env var CHANNEL_SIZE is required.')
}

const channels = createChannels(Number(CHANNEL_SIZE))

module.exports = {
  apps: channels
    .map(({ janusFull, janusThumbnail, rtmpChannel }) => [
      {
        args: `${rtmpChannel} ${janusFull.port}`,
        name: processName(rtmpChannel, FULL),
        script: './stream_to_janus.sh',
      },
      {
        args: `${rtmpChannel} ${janusThumbnail.port}`,
        name: processName(rtmpChannel, THUMBNAIL),
        script: './stream_to_janus_thumbnail.sh',
      },
    ])
    .reduce((array, two) => array.concat(two), []),
}

if (!module.parent) {
  console.log(JSON.stringify(module.exports, null, '  '))
}
