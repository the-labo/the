'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
  newId,
} from '@the-/util-ui'
import { TheSpin } from '@the-/ui-spin'
import L from '@okunishinishi/leaflet-shim'
import DivIcon from './classes/DivIcon'
import TileLayer from './classes/TileLayer'
import TheMapMarker from './TheMapMarker'

const tappableSize = ThemeValues.tappableHeight
const nullOrUndefined = (v) => v === null || typeof v === 'undefined'

/**
 * Geo map for the-components
 */
class TheMap extends React.Component {
  constructor(props) {
    super(props)
    this.map = null
    this.mapLayers = {}
    this.mapMarkers = {}
    this.mapElmRef = React.createRef()
    this.mapLayerControl = null
    this.mapZoomControl = null
    this.mapElmId = newId({ prefix: 'the-map' })
    this.state = {
      mapMarkersNodes: {},
    }
    this.mapEventHandlers = {
      click: (e) => {
        const { onClick } = this.props
        const { lat, lng } = e.latlng
        onClick && onClick({ lat, lng })
      },
      load: () => {},
      moveend: () => {
        this.needsChange()
      },
      resize: () => {
        this.needsChange()
      },
      unload: () => {},
      zoomend: () => {
        this.needsChange()
      },
    }
  }

  applyCall(prevProps, actions) {
    const diff = changedProps(prevProps, this.props)
    for (const [target, action] of Object.entries(actions)) {
      const needsUpdate = target.split(',').some((k) => k in diff)
      if (needsUpdate) {
        action(this.props)
      }
    }
  }

  applyLayerControl(layerControlEnabled) {
    const { map, mapLayers } = this
    if (!map) {
      return
    }
    if (!layerControlEnabled) {
      if (this.mapLayerControl) {
        this.mapLayerControl.remove()
        this.mapLayerControl = null
      }
      return
    }
    const { layerControlPosition } = this.props
    const mapLayerControl = (this.mapLayerControl = L.control.layers(
      Object.assign(
        {},
        ...Object.values(mapLayers).map((layer) => ({
          [layer.title]: layer,
        })),
      ),
      {},
      { position: layerControlPosition },
    ))
    mapLayerControl.addTo(map)
  }

  applyLayers(layers) {
    const { map, mapLayers } = this
    if (!map) {
      return
    }
    {
      const layerValuesToAdd = layers.filter(({ key }) => !mapLayers[key])
      for (const { key, url, ...options } of layerValuesToAdd) {
        const layer = this.createLayer(url, options)
        mapLayers[key] = layer
        map.addLayer(layer)
      }
    }
    {
      const keysToRemain = layers.map(({ key }) => key)
      const layerEntriesToRemove = Object.entries(mapLayers).filter(
        ([key]) => !keysToRemain.includes(key),
      )
      for (const [key, layer] of layerEntriesToRemove) {
        layer.unbindHandlers()
        map.removeLayer(layer)
        delete mapLayers[key]
      }
    }
    if (this.mapLayerControl) {
      this.mapLayerControl.remove()
    }
    this.needsChange()
  }

  applyMarkers(markers) {
    const { map, mapMarkers } = this
    if (!map) {
      return
    }
    {
      const mapMarkersNodes = { ...this.state.mapMarkersNodes }
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
        const marker = mapMarkers[key]
        if (marker) {
          const { height, lat, lng, node, onClick, width } = options
          marker.setLatLng({ lat, lng })
          marker.node = this.markerNode({
            height,
            marker,
            node,
            onClick,
            width,
          })
          mapMarkersNodes[key] = marker.node
        } else {
          const marker = this.createMarker(map, options)
          mapMarkers[key] = marker
          mapMarkersNodes[key] = marker.node
        }
      }
      this.setState({ mapMarkersNodes })
    }
    {
      const keysToRemain = markers.map(({ key }) => key)
      const markerEntriesToRemove = Object.entries(mapMarkers).filter(
        ([key]) => !keysToRemain.includes(key),
      )
      for (const [key, marker] of markerEntriesToRemove) {
        marker.remove()
        delete mapMarkers[key]
        const mapMarkersNodes = { ...this.state.mapMarkersNodes }
        delete mapMarkersNodes[key]
        this.setState({ mapMarkersNodes })
      }
    }
    this.mapMarkers = mapMarkers
    this.needsChange()
  }

  applySight({ lat, lng, zoom } = {}) {
    const updated = this.updateMapView({ lat, lng, zoom })
    if (updated) {
      this.needsChange({ force: true })
    }
  }

  applyZoomControl(zoomControlEnabled) {
    const { map } = this
    if (!map) {
      return
    }
    if (!zoomControlEnabled) {
      if (this.mapZoomControl) {
        this.mapZoomControl.remove()
        this.mapZoomControl = null
      }
      return
    }
    const { zoomControlPosition } = this.props
    const mapZoomControl = (this.mapZoomControl = L.control.zoom({
      position: zoomControlPosition,
    }))
    mapZoomControl.addTo(map)
  }

  componentDidMount() {
    const mapElm = this.mapElmRef.current
    const map = L.map(mapElm.id, {
      fadeAnimation: false,
      zoomControl: false,
    })
    this.map = map
    const {
      lat,
      layerControlEnabled,
      layers,
      lng,
      markers,
      onLeafletMap,
      zoom,
      zoomControlEnabled,
    } = this.props
    onLeafletMap && onLeafletMap(map)
    for (const [event, handler] of Object.entries(this.mapEventHandlers)) {
      map.on(event, handler)
    }
    this.applySight({ lat, lng, zoom })
    this.applyLayers(layers)
    this.applyLayerControl(layerControlEnabled)
    this.applyZoomControl(zoomControlEnabled)
    this.applyMarkers(markers)
    this.needsChange()
  }

  componentDidUpdate(prevProps) {
    const diff = changedProps(prevProps, this.props)
    this.applyCall(prevProps, {
      'map,lat,lng,zoom': ({ lat, lng, zoom }) =>
        this.applySight({ lat, lng, zoom }),
      'map,layerControlEnabled': ({ layerControlEnabled }) =>
        this.applyLayerControl(layerControlEnabled),
      'map,layers': ({ layers }) => this.applyLayers(layers),
      'map,markers': ({ markers }) => this.applyMarkers(markers),
      'map,zoomControlEnabled': ({ zoomControlEnabled }) =>
        this.applyZoomControl(zoomControlEnabled),
    })
    const needsUpdateLayerControl = ['map', 'layerControlEnabled'].some(
      (k) => k in diff,
    )
    if (needsUpdateLayerControl) {
      // TODO
    }
  }

  componentWillUnmount() {
    const { map } = this
    if (map) {
      for (const [event, handler] of Object.entries(this.mapEventHandlers)) {
        map.off(event, handler)
      }
      map.remove()
      this.map = null
    }
    this.mapLayers = {}
  }

  createLayer(url, { title, ...options } = {}) {
    const layer = new TileLayer(url, options)
    layer.title = title
    layer.bindHandlers()
    return layer
  }

  createMarker(map, options = {}) {
    const {
      className,
      draggable = false,
      height = tappableSize,
      interactive = !this.props.freezed,
      lat,
      lng,
      node,
      onClick,
      riseOnHover = true,
      width = tappableSize,
    } = options
    const marker = L.marker([lat, lng], {
      draggable,
      icon: new DivIcon({
        className: c('the-map-marker-div-icon', className),
        iconSize: L.point(width, height),
      }),
      interactive,
      riseOnHover,
    })
    marker.addTo(map)
    marker.node = this.markerNode({ height, marker, node, onClick, width })
    return marker
  }

  getMapData() {
    const { map } = this
    if (!map) {
      return null
    }
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
  }

  markerNode({
    height = tappableSize,
    marker,
    node,
    onClick,
    width = tappableSize,
  }) {
    return (
      <TheMapMarker
        container={marker.getElement()}
        onClick={onClick}
        style={{ height, width }}
      >
        {node || null}
      </TheMapMarker>
    )
  }

  needsChange(options = {}) {
    const { force = false } = options
    const { onChange } = this.props
    const mapData = this.getMapData()
    if (!mapData) {
      return
    }
    const skip =
      !force &&
      ['lat', 'lng', 'zoom'].every((k) => this.props[k] === mapData[k])
    if (skip) {
      return
    }
    onChange && onChange(mapData)
  }

  render() {
    const { props, state } = this
    const { children, className, freezed, height, spinning, width } = props
    const { mapMarkersNodes } = state
    const style = { ...props.style, height, width }
    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['className', 'width', 'height'],
        })}
        {...eventHandlersFor(props, { except: ['onClick'] })}
        className={c('the-map', className)}
        style={style}
      >
        <TheSpin className='the-map-spin' cover enabled={spinning} />
        <div
          className={c('the-map-map', {
            'the-map-map-freezed': freezed,
          })}
          id={this.mapElmId}
          ref={this.mapElmRef}
          style={style}
        >
          {children}
        </div>
        {Object.entries(mapMarkersNodes).map(([k, node]) => (
          <React.Fragment key={k}>{node || null}</React.Fragment>
        ))}
      </div>
    )
  }

  updateMapView({ lat, lng, zoom }) {
    const { map } = this
    if (!map) {
      return false
    }
    if (!this.mapReady) {
      map.setView([lat, lng], zoom)
      this.mapReady = true
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
  }
}

TheMap.propTypes = {
  /** Disable all interactions */
  freezed: PropTypes.bool,
  /** Height of map */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** latitude value */
  lat: PropTypes.number.isRequired,
  /** longitude value */
  lng: PropTypes.number.isRequired,
  /** Callback when map map created */
  onLeafletMap: PropTypes.func,
  /** Shows spinner */
  spinning: PropTypes.bool,
  /** Width of map */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheMap.defaultProps = {
  freezed: false,
  height: null,
  layerControlEnabled: true,
  layerControlPosition: 'topright',
  layers: [
    {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      key: 'default',
      maxZoom: 19,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
  ],
  markers: [],
  onLeafletMap: null,
  spinning: false,
  width: null,
  zoomControlEnabled: true,
  zoomControlPosition: 'topleft',
}

TheMap.displayName = 'TheMap'
TheMap.DomEvent = L.DomEvent
TheMap.DomUtil = L.DomUtil

export default TheMap
