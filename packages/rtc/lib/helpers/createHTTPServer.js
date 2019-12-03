'use strict'

const http = require('http')

function createHTTPServer() {
  return http.Server((req, res) => {
    res.writeHead(404)
    res.end()
  })
}

module.exports = createHTTPServer
