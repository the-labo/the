'use strict'

const argx = require('argx')
const uuid = require('uuid')
const { TheMedia } = require('@the-/media')
const { get } = require('@the-/window')
const { ChannelNames, IOEvents, PeerPurposes } = require('./constants')
const {
  assertMix,
  channelMix,
  peerMix,
  promiseMix,
  serializeMix,
  socketMix,
} = require('./mixins')

const TheRTCClientBase = [
  channelMix,
  assertMix,
  promiseMix,
  socketMix,
  serializeMix,
  peerMix,
].reduce((Class, mix) => mix(Class), class Base {})

/**
 * @memberof module:@the-/rtc-client
 * @class TheRTCClient
 */
class TheRTCClient extends TheRTCClientBase {
  constructor(options = {}) {
    super()
    const {
      iceTransportPolicy = 'all',
      info = {},
      mediaConstrains = { audio: true, video: true },
      onLocal,
      onRemote,
      onRemoteFail,
      onRemoteGone,
      onRoom,
      rid = uuid.v4(),
    } = options
    this.room = null
    this.media = new TheMedia(mediaConstrains)
    this.iceServers = null
    this.onRemote = onRemote
    this.onRemoteGone = onRemoteGone
    this.onRemoteFail = onRemoteFail
    this.onLocal = onLocal
    this.onRoom = onRoom
    this.iceTransportPolicy = iceTransportPolicy
    this._rid = rid
    this._info = info
  }

  /**
   * Audio enabled or not
   * @returns {boolean}
   */
  get audioEnabled() {
    return this.media.audioEnabled
  }

  /**
   * Additional info
   * @returns {Object}
   */
  get info() {
    return this._info
  }

  /**
   * RTC client id
   * @returns {string}
   */
  get rid() {
    return this._rid
  }

  /**
   * Status
   * @returns {Object}
   */
  get state() {
    const { audioEnabled, info, rid, room, videoEnabled } = this
    return {
      audioEnabled,
      info,
      rid,
      roomName: room && room.name,
      videoEnabled,
    }
  }

  /**
   * Video enabled
   * @returns {boolean}
   */
  get videoEnabled() {
    return this.media.videoEnabled
  }

  getRoomClientFor(rid) {
    const clients = this.room && this.room.clients
    if (!clients) {
      return null
    }

    return clients.find((client) => client.rid === rid)
  }

  hasPeers() {
    const peers = Object.entries(this.peers)
    return peers.length > 0
  }

  pidFor(from, to, purpose) {
    return `${from}=>${to}#${purpose}`
  }

  subscribe(topic, callback) {
    return this.subscribePubSubChannel(topic, callback)
  }

  async answerToPeerOffer(offer) {
    const {
      iceServers,
      iceTransportPolicy,
      media: { stream: localStream },
      rid: local,
    } = this
    const { desc, from: remote, pid, purpose } = offer
    const peer = await this.createAnswerPeer({
      iceServers,
      iceTransportPolicy,
      onDataChannel: (channel) => {
        this.receiveDataChannel(channel, { from: remote })
      },
      onDisconnect: ({ peer }) => {
        this.onRemoteGone && this.onRemoteGone({ peer, rid: remote })
      },
      onStream: (stream, { peer }) => {
        const client = this.getRoomClientFor(remote)
        this.onRemote && this.onRemote({ ...client, peer, stream })
      },
      pid,
      purpose,
      remoteDescription: desc,
      stream: localStream,
    })
    this.emitSocketEvent(IOEvents.PEER_ANSWER, {
      desc: peer.localDescription,
      from: local,
      pid,
      purpose,
      to: remote,
    })
  }

  /**
   * Connect to server
   * @param {string} url - Server url
   * @param {Object} [options] - Optional settings
   * @returns {Promise<undefined>}
   */
  async connect(url, options) {
    // Parse arguments
    {
      const args = argx(arguments)
      url = args.shift('string') || get('location.origin')
      options = args.pop('object') || {}
    }
    const { forceNew = true, path } = options
    const { rid } = this
    const socket = this.createSocket(url, {
      forceNew,
      path,
      query: { rid },
    })
    this.registerSocket(socket)
    this.listenToSocketEvents({
      [IOEvents.PEER_ICE]: (coming) => {
        void this.receivePeerIce(coming)
      },
      [IOEvents.PEER_OFFER]: (offer) => {
        void this.receivePeerOffer(offer)
      },
      [IOEvents.ROOM_STATE]: (roomState) => {
        this.room = roomState
        this.onRoom && this.onRoom(this.room)
      },
    })
    await this.asPromise(
      (resolve) => {
        socket.once(IOEvents.CONFIG_ICE_SERVERS, ({ iceServers }) => {
          this.iceServers = iceServers
          resolve()
        })
      },
      {
        label: 'WAIT_ICE_SERVER',
        timeout: 10000,
      },
    )
  }

  /**
   * Disconnect from signaling server
   * @returns {Promise<undefined>}
   */
  async disconnect() {
    if (this.room) {
      await this.leave()
    }

    this.destroySocket()
  }

  async establishPeer(client, purpose) {
    const { rid: remote } = client
    const { iceServers, iceTransportPolicy, rid: local, socket } = this
    const pid = this.pidFor(local, remote, purpose)
    const peer = await this.createOfferPeer({
      iceServers,
      iceTransportPolicy,
      onDataChannel: (channel) => {
        this.receiveDataChannel(channel, { from: remote })
      },
      onDisconnect: ({ peer }) => {
        const client = this.getRoomClientFor(remote)
        this.onRemoteGone && this.onRemoteGone({ ...client, peer })
      },
      onFail: ({ peer }) => {
        const client = this.getRoomClientFor(remote)
        this.onRemoteFail && this.onRemoteFail({ ...client, peer })
      },
      onIceCandidate: (ice) => {
        this.emitSocketEvent(IOEvents.PEER_ICE, {
          from: local,
          ice,
          pid,
          to: remote,
        })
      },
      onStream: (stream, { peer }) => {
        this.onRemote &&
          this.onRemote({
            ...client,
            peer,
            stream,
          })
      },
      pid,
      purpose,
      stream: this.media.stream,
    })
    const answer = await this.asPromise(
      (resolve) => {
        const onAnswer = (answer) => {
          if (answer.to !== this.rid) {
            return
          }

          socket.off(IOEvents.PEER_ANSWER, onAnswer)
          resolve(answer)
        }
        socket.on(IOEvents.PEER_ANSWER, onAnswer)
        this.emitSocketEvent(IOEvents.PEER_OFFER, {
          desc: peer.localDescription,
          from: local,
          pid,
          purpose,
          to: remote,
        })
      },
      {
        label: 'WAITING_PEER_ANSWER',
      },
    )
    await this.setPeerRemoteDesc(pid, answer.desc)
    return peer
  }

  async join(roomName) {
    this.assertNotHasRoom()
    await this.media.startIfNeeded().catch(() => {
      // TODO handle error
    })
    const { roomState } = await this.emitSocketEventWithAck(
      IOEvents.ROOM_JOIN,
      { roomName },
      {
        failEvent: IOEvents.ROOM_JOIN_FAIL,
        successEvent: IOEvents.ROOM_JOIN_SUCCESS,
      },
    )
    this.room = roomState
    await this.syncState()
    for (const client of roomState.clients) {
      if (client.rid === this.rid) {
        continue
      }

      await this.establishPeer(client, PeerPurposes.DEFAULT)
    }
  }

  async leave() {
    this.assertHasRoom()
    await this.media.stopIfNeeded()
    const { room } = this
    await this.emitSocketEventWithAck(
      IOEvents.ROOM_LEAVE,
      { roomName: room.name },
      {
        failEvent: IOEvents.ROOM_LEAVE_FAIL,
        successEvent: IOEvents.ROOM_LEAVE_SUCCESS,
      },
    )

    // Cleanup
    await this.destroyAllPeers()

    this.room = null
  }

  /**
   * Publish topic via pub-sub channel
   * @param {string} topic - Topic name
   * @param {Object} payload - Payload data
   * @param {Object} options
   * @returns {Promise<undefined>}
   */
  async publish(topic, payload, options = {}) {
    const { purpose = PeerPurposes.DEFAULT } = options
    const peers = this.getPeersByPurpose(purpose)
    for (const peer of peers) {
      const channel = await this.peerDataChannel(
        peer.extra.pid,
        ChannelNames.PUB_SUB_CHANNEL,
      )
      const serialized = this.serializeChannelData({
        payload,
        topic,
      })
      await channel.send(serialized)
    }
  }

  async receivePeerIce(coming) {
    const { ice, pid, to } = coming
    if (to !== this.rid) {
      console.warn('[TheRTCClient] Invalid ice:', coming)
      return
    }

    if (!ice) {
      return
    }

    try {
      await this.setPeerICECandidate(pid, ice)
    } catch (e) {
      console.warn(`[TheRTCClient] ${e.message}`, ice)
    }
  }

  async receivePeerOffer(offer) {
    if (offer.to !== this.rid) {
      console.warn('[TheRTCClient] Invalid offer:', offer)
      return
    }

    await this.answerToPeerOffer(offer)
  }

  async syncState() {
    const {
      media: { stream },
      onLocal,
      state,
    } = this
    this.emitSocketEvent(IOEvents.CLIENT_STATE, state)
    onLocal && onLocal({ ...state, stream })
  }

  async toggleAudioEnabled(enabled) {
    this.assertHasRoom()
    this.media.toggleAudioEnabled(enabled)
    await this.syncState()
  }

  async toggleScreenShare(enabled) {
    this.assertHasRoom()
    if (enabled) {
      this.emitSocketEvent(IOEvents.SCREEN_SHARE_START)
    } else {
      this.emitSocketEvent(IOEvents.SCREEN_SHARE_STOP)
    }
  }

  async toggleVideoEnabled(enabled) {
    this.assertHasRoom()
    this.media.toggleVideoEnabled(enabled)
    await this.syncState()
  }

  async updateMediaConstrains(mediaConstrains) {
    const { media, peers } = this
    await media.stopIfNeeded()
    const newMedia = new TheMedia(mediaConstrains)
    this.media = newMedia
    await newMedia.startIfNeeded()
    const newTracksHash = newMedia.stream.getTracks().reduce(
      (hash, track) => ({
        ...hash,
        [track.kind]: [...(hash[track.kind] || []), track],
      }),
      {},
    )
    for (const [, peer] of Object.entries(peers)) {
      for (const sender of peer.getSenders()) {
        const { track } = sender
        const newTracks = newTracksHash[track.kind]
        const newTrack = newTracks && newTracks.shift()
        if (newTrack) {
          track.stop()
          await sender.replaceTrack(newTrack)
        } else {
          console.warn('[TheRTCClient] Track lost', track.kind)
        }
      }
    }
  }
}

module.exports = TheRTCClient
