'use strict'

const socketIO = require('socket.io')
const { TopologyTypes } = require('./constants')
const { handleUnknownKeys, parseTurnSecret } = require('./helpers')
const createHTTPServer = require('./helpers/createHTTPServer')
const { ioMix, sfuMix } = require('./mixins')

const TheRTCBase = [ioMix, sfuMix].reduce((C, mix) => mix(C), class Base {})

/**
 * @memberof module:@the-/rtc
 * @class TheRTC
 * @param {Object} [config={}] - RTC Configuration
 * @param {Object|Object[]} [config.stun] - STUN server config(s)
 * @param {string} [config.stun.url] - STUN server URL
 * @param {Object|Object[]} [config.turn] - TURN server config(s)
 * @param {string} [config.turn.url] - TURN server URL
 * @param {string} [config.turn.secret] - TURN server secret
 * @param {string} [config.turn.expiry] - TURN server expiry
 * @param {string} [config.topology='mesh'] - 'mesh', 'sfu'
 */
class TheRTC extends TheRTCBase {
  constructor(config = {}) {
    super()
    this.closedAt = null
    this.listenAt = null
    this.server = null
    this.ioConnector = null

    const {
      listeners = {},
      stun: stunConfig = { url: 'stun:stun.l.google.com:19302' },
      topology = TopologyTypes.MESH,
      turn: turnConfig = null,
      ...rest
    } = config
    this.sfuEnabled = String(topology) === TopologyTypes.SFU
    this.stunConfig = stunConfig
    this.turnConfig = turnConfig
    this.listeners = listeners
    handleUnknownKeys(rest, {
      label: 'constructor',
    })
  }

  defineICEServers(name) {
    return [
      ...[]
        .concat(this.stunConfig)
        .filter(Boolean)
        .map(({ url = [], urls = [] }) => ({ urls: [].concat(url, urls) })),
      ...[]
        .concat(this.turnConfig)
        .filter(Boolean)
        .map(
          ({
            expiry = 86400 * 1000,
            password,
            secret,
            url = [],
            urls,
            username,
          }) => {
            if (urls) {
              console.warn('[TheRTC] "urls" is deprecated. Use "url" instead.')
              url = [].concat(url, urls).filter(Boolean)
            }

            const hasSecret = !!secret
            if (hasSecret) {
              // Dynamic credential
              const { credential, username } = parseTurnSecret(
                name,
                secret,
                expiry,
              )
              return {
                credential,
                urls: [].concat(url),
                username,
              }
            } else {
              return { credential: password, urls: [].concat(url), username }
            }
          },
        ),
    ]
  }

  async close() {
    this.closedAt = new Date()
    if (this.ioConnector) {
      this.ioConnector.close()
      this.ioConnector = null
    }
    await new Promise((resolve, reject) =>
      this.server.close((err) => (err ? reject(err) : resolve())),
    )
  }

  async listen(port) {
    if (this.listenAt) {
      throw new Error('[TheRTC] Already listening')
    }

    this.listenAt = new Date()
    const server = createHTTPServer()
    this.server = server
    const io = socketIO(server)
    this.registerIO(io, {
      defineICEServers: (name) => this.defineICEServers(name),
    })
    await new Promise((resolve, reject) =>
      server.listen(port, (err) => (err ? reject(err) : resolve())),
    )
  }
}

module.exports = TheRTC
