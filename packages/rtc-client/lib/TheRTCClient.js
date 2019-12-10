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
    this.callbacks = {
      onLocal,
      onRemote,
      onRemoteFail,
      onRemoteGone,
      onRoom,
    }
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

  handleLocal(stream) {
    const {
      callbacks: { onLocal },
      state,
    } = this
    onLocal && onLocal({ ...state, stream })
  }

  handleRemote(rid, peer, stream) {
    const client = this.getRoomClientFor(rid)
    const {
      callbacks: { onRemote },
    } = this
    onRemote &&
      onRemote({
        ...client,
        peer,
        stream,
      })
  }

  handleRemoteGone(rid, peer) {
    const {
      callbacks: { onRemoteGone },
    } = this
    onRemoteGone && onRemoteGone({ peer, rid })
  }

  handleRoom(roomState) {
    const rids = new Set(roomState.clients.map((c) => c.rid))
    const goneClients = ((this.room && this.room.clients) || []).filter(
      (client) => !rids.has(client.rid),
    )

    this.room = roomState
    const {
      callbacks: { onRoom },
    } = this
    onRoom && onRoom(roomState)
    const remoteClients = roomState.clients.filter((c) => c.rid !== this.rid)
    for (const client of remoteClients) {
      for (const peer of Object.values(this.peers)) {
        const {
          extra: { remoteStream },
        } = peer
        this.handleRemote(client.rid, peer, remoteStream)
      }
    }
    for (const goneClient of goneClients) {
      const peers = Object.values(this.peers).filter(
        (peer) => peer.extra.remoteRid === goneClient.rid,
      )
      for (const peer of peers) {
        this.handleRemoteGone(goneClient.rid, peer)
        try {
          peer.close()
        } catch (e) {}
      }
    }
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
      rid: localRid,
    } = this
    const { desc, from: remoteRid, pid, purpose } = offer
    const peer = await this.createAnswerPeer({
      iceServers,
      iceTransportPolicy,
      localStream,
      onDataChannel: (channel) => {
        this.receiveDataChannel(channel, { from: remoteRid })
      },
      onDisconnect: ({ peer }) => {
        this.handleRemoteGone(remoteRid, peer)
      },
      onStream: (stream, { peer }) => {
        this.handleRemote(remoteRid, peer, stream)
      },
      pid,
      purpose,
      remoteDescription: desc,
      rid: remoteRid,
    })
    this.emitSocketEvent(IOEvents.PEER_ANSWER, {
      desc: peer.localDescription,
      from: localRid,
      pid,
      purpose,
      to: remoteRid,
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
        this.handleRoom(roomState)
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
    const { rid: remoteRid } = client
    const { iceServers, iceTransportPolicy, rid: localRid, socket } = this
    const pid = this.pidFor(localRid, remoteRid, purpose)
    const peer = await this.createOfferPeer({
      iceServers,
      iceTransportPolicy,
      localStream: this.media.stream,
      onDataChannel: (channel) => {
        this.receiveDataChannel(channel, { from: remoteRid })
      },
      onDisconnect: ({ peer }) => {
        const client = this.getRoomClientFor(remoteRid)
        this.callbacks.onRemoteGone &&
          this.callbacks.onRemoteGone({ ...client, peer })
      },
      onFail: ({ peer }) => {
        const client = this.getRoomClientFor(remoteRid)
        this.callbacks.onRemoteFail &&
          this.callbacks.onRemoteFail({ ...client, peer })
      },
      onIceCandidate: (ice) => {
        this.emitSocketEvent(IOEvents.PEER_ICE, {
          from: localRid,
          ice,
          pid,
          to: remoteRid,
        })
      },
      onStream: (stream, { peer }) => {
        this.handleRemote(remoteRid, peer, stream)
      },
      pid,
      purpose,
      rid: remoteRid,
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
          from: localRid,
          pid,
          purpose,
          to: remoteRid,
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
      state,
    } = this
    this.emitSocketEvent(IOEvents.CLIENT_STATE, state)
    this.handleLocal(stream)
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
    await this.syncState()
  }
}

module.exports = TheRTCClient
