/**
 * IOEvents
 * @module IOEvents
 */
'use strict'

const IOEvents = Object.freeze(
  /** @lends IOEvents */
  {
    CLIENT_STATE: 'client:state',
    CONFIG_ICE_SERVERS: 'config:ice-servers',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    PEER_ANSWER: 'peer:answer',
    PEER_ICE: 'peer:ice',
    PEER_OFFER: 'peer:offer',
    ROOM_JOIN: 'room:join',
    ROOM_JOIN_FAIL: 'room:join:fail',
    ROOM_JOIN_SUCCESS: 'room:join:success',
    ROOM_LEAVE: 'room:leave',
    ROOM_LEAVE_FAIL: 'room:leave:fail',
    ROOM_LEAVE_SUCCESS: 'room:leave:success',
    ROOM_STATE: 'room:state',
    SCREEN_SHARE_START: 'screen-share:start',
    SCREEN_SHARE_STOP: 'screen-share:stop',
  }
)

module.exports = IOEvents
