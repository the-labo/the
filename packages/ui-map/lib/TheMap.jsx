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
import MapAccess from './helpers/MapAccess'

/**
 * @file Geo map for the-components
 */
class TheMap extends React.Component {
  constructor(props) {
    super(props)
    this.mapElmRef = React.createRef()
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
    this.mapAccess.applyLayers(layers)
    this.needsChange()
  }

  applyMarkers(markers) {
    const mapMarkersNodes = { ...this.state.mapMarkersNodes }
    this.mapAccess.applyMarkers(markers, mapMarkersNodes, {
      freezed: this.props.freezed,
    })
    this.setState({ mapMarkersNodes })
    this.needsChange()
  }

  applySight({ lat, lng, zoom } = {}) {
    const updated = this.mapAccess.update({ lat, lng, zoom })
    if (updated) {
      this.needsChange({ force: true })
    }
  }

  applyZoomControl(zoomControlEnabled) {
    if (!zoomControlEnabled) {
      this.mapAccess.removeZoomControl()
      return
    }

    const {
      props: { zoomControlPosition },
    } = this
    this.mapAccess.addZoomControl(zoomControlPosition)
  }

  componentDidMount() {
    const {
      mapElmRef: { current: mapElm },
    } = this
    const map = L.map(mapElm.id, {
      fadeAnimation: false,
      zoomControl: false,
    })
    this.mapAccess = MapAccess(map, {
      TileLayerClass: this.props.TileLayerClass || TileLayer,
    })
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
      'lat,lng,zoom': ({ lat, lng, zoom }) =>
        this.applySight({ lat, lng, zoom }),
      layerControlEnabled: ({ layerControlEnabled }) =>
        this.applyLayerControl(layerControlEnabled),
      layers: ({ layers }) => this.applyLayers(layers),
      markers: ({ markers }) => this.applyMarkers(markers),
      zoomControlEnabled: ({ zoomControlEnabled }) =>
        this.applyZoomControl(zoomControlEnabled),
    })
  }

  componentWillUnmount() {
    const { mapAccess } = this
    mapAccess.removeHandlers(this.mapEventHandlers)
    mapAccess.cleanup()
    this.mapAccess = null
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
