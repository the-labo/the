'use strict'

const canZoomTrack = (track) => {
  const capabilities = track && track.getCapabilities()
  return !!capabilities && 'zoom' in capabilities
}

exports.canZoomTrack = canZoomTrack

module.exports = {
  canZoomTrack,
}
