'use strict'

const { IOEvents } = require('../constants')
const { handleUnknownKeys } = require('../helpers')
const IOConnector = require('../helpers/IOConnector')

/**
 * Mixin for io
 * @memberof module:@the-/rtc.mixins
 * @function ioMix
 * @param {function()} Class
 * @returns {function()} Class
 */
function ioMix(Class) {
  class IoMixed extends Class {
    ioEventHandlersForSocket(socket) {
      const { listeners } = this
      return {
        [IOEvents.CLIENT_STATE]: ({
          audioEnabled,
          info,
          rid,
          roomName,
          videoEnabled,
          ...unknown
        } = {}) => {
          handleUnknownKeys(unknown, { label: 'IOEvents.CLIENT_STATE' })
          void this.handleIOClientState(socket, {
            audioEnabled,
            info,
            rid,
            roomName,
            videoEnabled,
          })
        },
        [IOEvents.DISCONNECT]: () => {
          listeners.onGone && listeners.onGone(socket.theRTCState)
          if (this.sfuEnabled) {
            const {
              theRTCState: { sfu },
            } = socket
            this.cleanupSFU(sfu.peerIds)
          }
          // TODO mark as gone?
        },
        [IOEvents.PEER_ANSWER]: ({
          desc,
          from,
          pid,
          purpose,
          to,
          ...unknown
        } = {}) => {
          handleUnknownKeys(unknown, { label: 'IOEvents.PEER_ANSWER' })
          void this.handleIOPeerAnswer(socket, { desc, from, pid, purpose, to })
        },
        [IOEvents.PEER_ICE]: ({
          from,
          ice,
          pid,
          purpose,
          to,
          ...unknown
        } = {}) => {
          handleUnknownKeys(unknown, { label: 'IOEvents.PEER_ICE' })
          void this.handleIOPeerICE(socket, { from, ice, pid, purpose, to })
        },
        [IOEvents.PEER_OFFER]: ({
          desc,
          from,
          pid,
          purpose,
          to,
          ...unknown
        } = {}) => {
          handleUnknownKeys(unknown, { label: 'IOEvents.PEER_OFFER' })
          void this.handleIOPeerOffer(socket, { desc, from, pid, purpose, to })
        },
        [IOEvents.ROOM_JOIN]: ({ roomName, ...unknown } = {}) => {
          handleUnknownKeys(unknown, { label: 'IOEvents.ROOM_JOIN' })
          void this.handleIORoomJoin(socket, roomName)
        },
        [IOEvents.ROOM_LEAVE]: ({ roomName, ...unknown } = {}) => {
          handleUnknownKeys(unknown, { label: 'IOEvents.ROOM_LEAVE' })
          void this.handleIORoomLeave(socket, roomName)
        },
        [IOEvents.SCREEN_SHARE_START]: () => {
          void this.handleIOScreenShareStart(socket)
        },
        [IOEvents.SCREEN_SHARE_STOP]: () => {
          void this.handleIOScreenShareStop(socket)
        },
      }
    }

    registerIO(io, { iceServers } = {}) {
      this.ioConnector = IOConnector(io)
      if (this.sfuEnabled) {
        this.setupSFU({
          iceServers,
          sendAnswer: this.sendIOPeerAnswer.bind(this),
          sendIce: this.sendIOPeerICE.bind(this),
          sendOffer: this.sendIOPeerOffer.bind(this),
        })
      }

      const namespace = this.ioConnector.getNamespace()
      namespace.on(IOEvents.CONNECTION, (socket) => {
        const {
          handshake: {
            query: { rid },
          },
        } = socket

        socket.theRTCState = {
          info: {},
          rid,
          sfu: {
            peerIds: [],
          },
          socketId: socket.id,
        }
        const handlers = this.ioEventHandlersForSocket(socket)
        for (const [event, handler] of Object.entries(handlers)) {
          const handleWrap = (...args) => {
            handler(...args)
          }
          socket.on(event, handleWrap)
        }
        socket.emit(IOEvents.CONFIG_ICE_SERVERS, { iceServers })
      })
    }

    async handleIOClientState(socket, state = {}) {
      const {
        theRTCState: { roomName },
      } = socket
      socket.theRTCState = {
        ...socket.theRTCState,
        ...state,
        roomName,
      }
      await this.syncIORoomState(roomName)
    }

    async handleIOPeerAnswer(socket, answer) {
      const { pid } = answer
      if (this.sfuEnabled) {
        socket.theRTCState.sfu.peerIds.push(pid)
        await this.processPeerAnswerForSFU(pid, answer)
      } else {
        await this.sendIOPeerAnswer(answer)
      }
    }

    async handleIOPeerICE(socket, ice) {
      const { pid } = ice
      if (this.sfuEnabled) {
        socket.theRTCState.sfu.peerIds.push(pid)
        await this.processPeerICEForSFU(pid, ice)
      } else {
        await this.sendIOPeerICE(ice)
      }
    }

    async handleIOPeerOffer(socket, offer) {
      const { pid } = offer
      if (this.sfuEnabled) {
        socket.theRTCState.sfu.peerIds.push(pid)
        await this.processPeerOfferForSFU(pid, offer)
      } else {
        await this.sendIOPeerOffer(offer)
      }
    }

    async handleIORoomJoin(socket, roomName) {
      const { ioConnector, listeners } = this
      const {
        theRTCState: { roomName: currentRoom },
      } = socket
      if (currentRoom) {
        if (currentRoom === roomName) {
          console.warn(
            `[TheRTC] Already in room: ${roomName} (socketId: ${socket.id}`,
          )
          return
        } else {
          await this.handleIORoomLeave(socket, currentRoom)
        }
      }

      try {
        await new Promise((resolve) => socket.join(roomName, () => resolve()))
        socket.theRTCState.roomName = roomName
        await this.syncIORoomState(roomName)
        const roomState = await ioConnector.getIORoomState(roomName)
        const data = {
          roomName,
          roomState,
          socketId: socket.id,
        }
        socket.emit(IOEvents.ROOM_JOIN_SUCCESS, data)
        listeners.onRoomJoin && listeners.onRoomJoin(socket.theRTCState)
      } catch (e) {
        socket.emit(IOEvents.ROOM_JOIN_FAIL, {
          error: e.message,
          roomName,
          socketId: socket.id,
        })
      }
    }

    async handleIORoomLeave(socket, roomName) {
      const { listeners } = this
      if (socket.theRTCState.roomName !== roomName) {
        socket.emit(IOEvents.ROOM_LEAVE_SUCCESS, {
          roomName,
          socketId: socket.id,
        })
        return
      }

      try {
        await new Promise((resolve) => socket.leave(roomName, () => resolve()))
        await this.syncIORoomState(roomName)
        socket.emit(IOEvents.ROOM_LEAVE_SUCCESS, {
          roomName,
          socketId: socket.id,
        })
        listeners.onRoomLeave && listeners.onRoomLeave(socket.theRTCState)
        socket.theRTCState.roomName = null
      } catch (e) {
        socket.emit(IOEvents.ROOM_LEAVE_FAIL, {
          error: e.message,
          roomName,
          socketId: socket.id,
        })
      }
    }

    async handleIOScreenShareStart(socket) {
      socket.theRTCState.screenSharing = true
      await this.syncIORoomState(socket.theRTCState.roomName)
    }

    async handleIOScreenShareStop(socket) {
      socket.theRTCState.screenSharing = false
      await this.syncIORoomState(socket.theRTCState.roomName)
    }

    async sendIOPeerAnswer(answer) {
      await this.sendToIORTCClient(answer.to, IOEvents.PEER_ANSWER, answer)
    }

    async sendIOPeerICE(ice) {
      await this.sendToIORTCClient(ice.to, IOEvents.PEER_ICE, ice)
    }

    async sendIOPeerOffer(offer) {
      await this.sendToIORTCClient(offer.to, IOEvents.PEER_OFFER, offer)
    }

    async sendToIORTCClient(rid, event, data) {
      const { ioConnector } = this
      const sockets = await ioConnector.getSocketsFor(rid)
      for (const socket of sockets) {
        socket.emit(event, data)
      }
    }

    async syncIORoomState(roomName) {
      if (!roomName) {
        return
      }
      const { ioConnector } = this
      const roomState = await ioConnector.getIORoomState(roomName)
      await ioConnector.broadcastToIORoom(
        roomName,
        IOEvents.ROOM_STATE,
        roomState,
      )
    }
  }

  return IoMixed
}

module.exports = ioMix
