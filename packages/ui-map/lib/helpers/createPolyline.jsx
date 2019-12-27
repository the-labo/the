'use strict'

import L from '@okunishinishi/leaflet-shim'

export default function createPolyline(positions, options = {}) {
  const { color = '#3388EE' } = options
  const polyline = L.polyline(positions, { color })
  return polyline
}
