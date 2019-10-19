/**
 * Browser用のstub
 * サーバーサイド前提なので、クライアントサイドでは使わせない
 */
'use strict'

module.exports = new Proxy(
  {},
  {
    get: (target, key) => {
      const msg = `[@the-/server] You cannot use this package in browser (Trying access "${String(
        key,
      )}")`
      throw new Error(msg)
    },
  },
)
