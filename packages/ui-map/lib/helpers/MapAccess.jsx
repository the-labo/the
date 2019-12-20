'use strict'

import L from '@okunishinishi/leaflet-shim'
import createMarker from './createMarker'
import markerNodeFor from './markerNodeFor'

const nullOrUndefined = (v) => v === null || typeof v === 'undefined'

function MapAccess(map, { TileLayerClass }) {
  const state = {
    layerControl: null,
    layers: {},
    markers: {},
    ready: false,
    zoomControl: null,
  }
  const mapAccess = {
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
    addLayers(layerValues) {
      for (const { key, ...options } of layerValues) {
        const layer = mapAccess.createLayer(options)
        state.layers[key] = layer
        map.addLayer(layer)
      }
    },
    addMarker(key, options) {
      const marker = createMarker(map, options)
      state.markers[key] = marker
      return marker
    },
    addZoomControl(position) {
      const zoomControl = L.control.zoom({
        position,
      })
      zoomControl.addTo(map)
      state.zoomControl = zoomControl
    },
    applyLayers(layers) {
      const layerValuesToAdd = layers.filter(
        ({ key }) => !mapAccess.hasLayer(key),
      )
      mapAccess.addLayers(layerValuesToAdd)
      const keysToRemain = layers.map(({ key }) => key)
      const layerKeysToRemove = mapAccess
        .getLayerKeys()
        .filter((key) => !keysToRemain.includes(key))
      mapAccess.removeLayers(layerKeysToRemove)
      mapAccess.removeLayerControl()
    },
    applyMarkers(markers, mapMarkersNodes, { freezed }) {
      for (const { key, ...options } of markers) {
        if (!key) {
          console.warn('[TheMap] key is missing for marker:', options)
          continue
        }

        {
          const { lat, lng } = options
          if ([lat, lng].some(nullOrUndefined)) {
            console.warn('[TheMap] lat lng is missing for marker:', options)
            continue
          }
        }
        const marker = mapAccess.getMarker(key)
        if (marker) {
          const { height, lat, lng, node, onClick, width } = options
          marker.setLatLng({ lat, lng })
          marker.node = markerNodeFor({
            height,
            marker,
            node,
            onClick,
            width,
          })
          mapMarkersNodes[key] = marker.node
        } else {
          const marker = mapAccess.addMarker(key, {
            interactive: !freezed,
            ...options,
          })
          mapMarkersNodes[key] = marker.node
        }
      }
      const keysToRemain = markers.map(({ key }) => key)
      const markerKeysToRemove = mapAccess
        .getMarkerKeys()
        .filter((key) => !keysToRemain.includes(key))
      for (const [key] of markerKeysToRemove) {
        mapAccess.removeMarker(key)
        delete mapMarkersNodes[key]
      }
    },
    cleanup() {
      state.layers = {}
      state.markers = {}
      map.remove()
    },
    createLayer({ title, ...options } = {}) {
      const layer = new TileLayerClass(options)
      layer.title = title
      return layer
    },
    getLayerKeys() {
      return Object.keys(state.layers)
    },
    getMarker(key) {
      return state.markers[key]
    },
    getMarkerKeys() {
      return Object.keys(state.markers)
    },
    hasLayer(key) {
      return !!state.layers[key]
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
    removeLayers(layerKeys) {
      for (const key of layerKeys) {
        const layer = state.layers[key]
        if (layer) {
          map.removeLayer(layer)
          delete state.layers[key]
        }
      }
    },
    removeMarker(key) {
      const marker = state.markers[key]
      if (!marker) {
        return
      }
      marker.remove()
      delete state.markers[key]
    },
    removeZoomControl() {
      const { zoomControl } = state
      if (!zoomControl) {
        return
      }
      zoomControl.remove()
      state.zoomControl = null
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
  return mapAccess
}

export default MapAccess
