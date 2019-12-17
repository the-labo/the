'use strict'

module.exports = function canZoomTrack(track) {
  const capabilities = track && track.getCapabilities()
  return !!capabilities && 'zoom' in capabilities
}
