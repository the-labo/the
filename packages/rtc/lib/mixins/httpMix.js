'use strict'

/**
 * Mixin for http
 * @function httpMix
 * @param {function()} Class
 * @returns {function()} Class
 */
const http = require('http')

/** @lends httpMix */
function httpMix(Class) {
  class HttpMixed extends Class {
    createHTTPServer() {
      return http.Server((req, res) => {
        res.writeHead(404)
        res.end()
      })
    }
  }

  return HttpMixed
}

module.exports = httpMix
