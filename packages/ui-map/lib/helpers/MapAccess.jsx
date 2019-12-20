'use strict'

import L from '@okunishinishi/leaflet-shim'

function MapAccess(map) {
  const state = {
    layerControl: null,
    layers: {},
    markers: {},
    ready: false,
  }
  return {
    get state() {
      return state
    },
    addHandlers(handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        map.on(event, handler)
      }
    },
    addLayerControl(position) {
      const layerControl = L.control.layers(
        Object.assign(
          {},
          ...Object.values(state.layers).map((layer) => ({
            [layer.title]: layer,
          })),
        ),
        {},
        { position },
      )
      layerControl.addTo(map)
      state.layerControl = layerControl
    },
    cleanup() {
      state.layers = {}
      state.markers = {}
      map.remove()
    },
    removeHandlers(handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        map.off(event, handler)
      }
    },
    removeLayerControl() {
      const { layerControl } = state
      if (!layerControl) {
        return
      }
      layerControl.remove()
      state.layerControl = null
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
