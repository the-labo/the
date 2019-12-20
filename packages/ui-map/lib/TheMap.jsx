'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import L from '@okunishinishi/leaflet-shim'
import { TheSpin } from '@the-/ui-spin'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
  newId,
} from '@the-/util-ui'
import TileLayer from './classes/TileLayer'
import createMarker from './helpers/createMarker'
import MapAccess from './helpers/MapAccess'
import markerNodeFor from './helpers/markerNodeFor'

const nullOrUndefined = (v) => v === null || typeof v === 'undefined'

/**
 * Geo map for the-components
 */
class TheMap extends React.Component {
  constructor(props) {
    super(props)
    this.map = null
    this.mapElmRef = React.createRef()
    this.mapLayerControl = null
    this.mapZoomControl = null
    this.mapElmId = newId({ prefix: 'the-map' })
    this.state = {
      mapMarkersNodes: {},
    }
    this.mapEventHandlers = {
      click: (e) => {
        const {
          props: { onClick },
        } = this
        const {
          latlng: { lat, lng },
        } = e
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
    const { map } = this

    if (!map) {
      return
    }

    if (!layerControlEnabled) {
      this.mapAccess.removeLayerControl()
      return
    }

    const {
      props: { layerControlPosition },
    } = this
    this.mapAccess.addLayerControl(layerControlPosition)
  }

  applyLayers(layers) {
    const {
      map,
      mapAccess: {
        state: { layers: mapLayers },
      },
    } = this

    if (!map) {
      return
    }

    {
      const layerValuesToAdd = layers.filter(({ key }) => !mapLayers[key])
      for (const { key, ...options } of layerValuesToAdd) {
        const layer = this.createLayer(options)
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
        map.removeLayer(layer)
        delete mapLayers[key]
      }
    }
    this.mapAccess.removeLayerControl()

    this.needsChange()
  }

  applyMarkers(markers) {
    const {
      map,
      mapAccess: {
        state: { markers: mapMarkers },
      },
    } = this

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
          marker.node = markerNodeFor({
            height,
            marker,
            node,
            onClick,
            width,
          })
          mapMarkersNodes[key] = marker.node
        } else {
          const marker = createMarker(map, {
            interactive: !this.props.freezed,
            ...options,
          })
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

    const {
      props: { zoomControlPosition },
    } = this
    const mapZoomControl = (this.mapZoomControl = L.control.zoom({
      position: zoomControlPosition,
    }))
    mapZoomControl.addTo(map)
  }

  componentDidMount() {
    const {
      mapElmRef: { current: mapElm },
    } = this
    const map = L.map(mapElm.id, {
      fadeAnimation: false,
      zoomControl: false,
    })
    this.map = map
    this.mapAccess = MapAccess(map)
    const {
      props: {
        lat,
        layerControlEnabled,
        layers,
        lng,
        markers,
        onLeafletMap,
        zoom,
        zoomControlEnabled,
      },
    } = this
    onLeafletMap && onLeafletMap(map)
    this.mapAccess.addHandlers(this.mapEventHandlers)
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
    const { mapAccess } = this
    mapAccess.removeHandlers(this.mapEventHandlers)
    mapAccess.cleanup()
    this.mapAccess = null
    this.map = null
  }

  createLayer({ title, ...options } = {}) {
    const TileLayerClass = this.props.TileLayerClass || TileLayer
    const layer = new TileLayerClass(options)
    layer.title = title
    return layer
  }

  needsChange(options = {}) {
    const { force = false } = options
    const {
      props: { onChange },
    } = this
    const mapData = this.mapAccess.toData()
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
    const {
      props,
      props: { children, className, freezed, height, spinning, width },
      state: { mapMarkersNodes },
    } = this

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
    return this.mapAccess.update({ lat, lng, zoom })
  }
}

TheMap.propTypes = {
  /** Class for tile layer */
  TileLayerClass: PropTypes.func,
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
  TileLayerClass: TileLayer,
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
