/**
 * Events for IO
 * @memberOf module:@the-/client
 * @namespace IOEvents
 */
'use strict'

const IOEvents = Object.freeze(
  /** @lends IOEvents */
  {
    CLIENT_CALLBACK: 'client:callback',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    RPC_ABORT: 'rpc:abort',
    RPC_CALL: 'rpc:call',
    RPC_KEEP: 'rpc:keep',
    RPC_RETURN: 'rpc:return',
    STREAM_CHUNK: 'stream:chunk',
    STREAM_CLOSE: 'stream:close',
    STREAM_DID_CLOSE: 'stream:did:close',
    STREAM_DID_OPEN: 'stream:did:open',
    STREAM_ERROR: 'stream:error',
    STREAM_FIN: 'stream:fin',
    STREAM_OPEN: 'stream:open',
  }
)

module.exports = IOEvents
