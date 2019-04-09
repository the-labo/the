/**
 * Mixin for http
 * @function httpMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const http = require('http')

/** @lends httpMix */
function httpMix(Class) {
  class HttpMixed extends Class {
    createHTTPServer() {
      const server = http.Server((req, res) => {
        res.writeHead(404)
        res.end()
      })
      return server
    }
  }

  return HttpMixed
}

module.exports = httpMix
