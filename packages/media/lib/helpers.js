'use strict'

exports.canZoomTrack = (track) => {
  const capabilities = track && track.getCapabilities()
  return !!capabilities && 'zoom' in capabilities
}
