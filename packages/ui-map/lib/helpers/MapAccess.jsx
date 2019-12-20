'use strict'

function MapAccess(map) {
  const state = {
    ready: false,
  }
  return {
    addHandlers(handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        map.on(event, handler)
      }
    },
    removeHandlers(handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        map.off(event, handler)
      }
    },
    toData() {
      const zoom = map.getZoom()
      const { lat, lng } = map.getCenter()
      const bounds = map.getBounds()
      return {
        bounds: {
          east: bounds.getEast(),
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          west: bounds.getWest(),
        },
        lat,
        lng,
        zoom,
      }
    },
    update({ lat, lng, zoom }) {
      if (!state.ready) {
        map.setView([lat, lng], zoom)
        state.ready = true
        return true
      }

      const currentZoom = map.getZoom()
      if (!currentZoom) {
        return false
      }

      const center = map.getCenter()
      if (!center) {
        return false
      }

      const same =
        center.lat === lat && center.lng === lng && currentZoom === zoom
      if (same) {
        return false
      }

      map.setView([lat, lng], zoom)
      return true
    },
  }
}

export default MapAccess
