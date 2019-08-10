'use strict'

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
const socketIO = require('socket.io')
const { TopologyTypes } = require('./constants')
const { handleUnknownKeys, parseTurnSecret } = require('./helpers')
const { httpMix, ioMix, sfuMix } = require('./mixins')

const TheRTCBase = [httpMix, ioMix, sfuMix].reduce(
  (C, mix) => mix(C),
  class Base {},
)

/** @lends module:@the-/rtc.TheRTC */
class TheRTC extends TheRTCBase {
  constructor(config = {}) {
    super()
    this.closedAt = null
    this.listenAt = null
    this.server = null
    this.io = null
    const {
      stun: stunConfig = { url: 'stun:stun.l.google.com:19302' },
      topology = TopologyTypes.MESH,
      turn: turnConfig = null,
      ...rest
    } = config
    this.sfuEnabled = String(topology) === TopologyTypes.SFU
    this.stunConfig = stunConfig
    this.turnConfig = turnConfig
    handleUnknownKeys(rest, {
      label: 'constructor',
    })
  }

  async close() {
    this.closedAt = new Date()
    this.io = null
    await new Promise((resolve, reject) =>
      this.server.close((err) => (err ? reject(err) : resolve())),
    )
  }

  async listen(port) {
    if (this.listenAt) {
      throw new Error('[TheRTC] Already listening')
    }

    this.listenAt = new Date()
    const server = this.createHTTPServer()
    this.server = server
    const io = socketIO(server)
    const iceServers = [
      ...[]
        .concat(this.stunConfig)
        .filter(Boolean)
        .map(({ url = [], urls = [] }) => ({ urls: [].concat(url, urls) })),
      ...[]
        .concat(this.turnConfig)
        .filter(Boolean)
        .map(
          ({ expiry = 86400, password, secret, url = [], urls, username }) => {
            if (urls) {
              console.warn('[TheRTC] "urls" is deprecated. Use "url" instead.')
              url = [].concat(url, urls).filter(Boolean)
            }

            const hasSecret = !!secret
            if (hasSecret) {
              // Dynamic credential
              const { credential, username } = parseTurnSecret(secret, expiry)
              return {
                credential,
                expiry,
                urls: [].concat(url),
                username,
              }
            } else {
              return { credential: password, urls: [].concat(url), username }
            }
          },
        ),
    ]
    this.registerIO(io, { iceServers })
    await new Promise((resolve, reject) =>
      server.listen(port, (err) => (err ? reject(err) : resolve())),
    )
  }
}

module.exports = TheRTC
