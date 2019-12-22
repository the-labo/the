'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from '@okunishinishi/leaflet-shim'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor, newId } from '@the-/util-ui'
import { get } from '@the-/window'
import TileLayer from './classes/TileLayer'
import MapAccess from './helpers/MapAccess'

/**
 * @file Geo map for the-components
 */
const TheMap = React.memo((props) => {
  const {
    TileLayerClass,
    children,
    className,
    draggingEnabled,
    freezed,
    height,
    lat,
    layerControlEnabled,
    layerControlPosition,
    layers,
    lng,
    markers,
    onChange,
    onClick,
    onLeafletMap,
    spinning,
    width,
    zoom,
    zoomControlEnabled,
    zoomControlPosition,
  } = props
  const mapElmRef = useRef(null)
  const mapElmId = useMemo(() => newId({ prefix: 'the-map' }), [])
  const [mapMarkersNodes, setMapMarkersNodes] = useState({})
  const [mapAccess, setMapAccess] = useState(null)

  const tmp = useMemo(
    () => ({
      mapAccess: null,
      pos: { lat, lng, zoom },
    }),
    [],
  )
  tmp.pos.lat = lat
  tmp.pos.lng = lng
  tmp.pos.zoom = zoom
  tmp.mapAccess = mapAccess
  tmp.mapMarkersNodes = mapMarkersNodes

  const needsChange = useCallback(
    (options = {}) => {
      if (!mapAccess) {
        return
      }
      const { force = false } = options
      const mapData = mapAccess.toData()
      if (!mapData) {
        return
      }
      const skip =
        !force && Object.entries(tmp.pos).every(([k, v]) => v === mapData[k])
      if (skip) {
        return
      }

      onChange && onChange(mapData)
    },
    [mapAccess],
  )

  const mapEventHandlers = useMemo(
    () => ({
      click: (e) => {
        const {
          latlng: { lat, lng },
        } = e
        onClick && onClick({ lat, lng })
      },
      load: () => {},
      moveend: () => {
        needsChange()
      },
      resize: () => {
        needsChange()
      },
      unload: () => {},
      zoomend: () => {
        needsChange()
      },
    }),
    [onClick, needsChange],
  )

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    if (!layerControlEnabled) {
      mapAccess.removeLayerControl()
      return
    }
    mapAccess.addLayerControl(layerControlPosition)
  }, [layerControlEnabled, mapAccess, layerControlPosition])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    mapAccess.applyLayers(layers)
    needsChange()
  }, [layers, mapAccess])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    const newMapMarkersNodes = { ...tmp.mapMarkersNodes }
    mapAccess.applyMarkers(markers, newMapMarkersNodes, { freezed })
    setMapMarkersNodes(newMapMarkersNodes)
    needsChange()
  }, [markers, mapAccess, freezed])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    mapAccess.toggleDragging(draggingEnabled)
  }, [mapAccess, draggingEnabled])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    const updated = mapAccess.update({ lat, lng, zoom })
    if (updated) {
      needsChange({ force: true })
    }
  }, [lat, lng, zoom, mapAccess])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    if (!zoomControlEnabled) {
      mapAccess.removeZoomControl()
      return
    }
    mapAccess.addZoomControl(zoomControlPosition)
  }, [zoomControlEnabled, zoomControlPosition, mapAccess])

  useEffect(() => {
    const map = L.map(mapElmId, {
      fadeAnimation: false,
      zoomControl: false,
    })
    const newMapAccess = MapAccess(map, {
      TileLayerClass: TileLayerClass || TileLayer,
    })
    newMapAccess.update({ lat, lng, zoom })
    setMapAccess(newMapAccess)
    onLeafletMap && onLeafletMap(map)
    return () => {
      newMapAccess.cleanup()
    }
  }, [TileLayerClass, mapElmId])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    mapAccess.addHandlers(mapEventHandlers)
    return () => {
      mapAccess.removeHandlers(mapEventHandlers)
    }
  }, [mapAccess, mapEventHandlers])

  useEffect(() => {
    if (!mapAccess) {
      return
    }
    const ResizeObserver = get('ResizeObserver')
    if (!ResizeObserver) {
      return
    }
    const { current: mapElm } = mapElmRef
    const resizeObserver = new ResizeObserver(() => {
      mapAccess.invalidate()
    })
    resizeObserver.observe(mapElm)
    return () => {
      resizeObserver.unobserve(mapElm)
      resizeObserver.disconnect()
    }
  }, [mapAccess])

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
        id={mapElmId}
        ref={mapElmRef}
        style={style}
      >
        {children}
      </div>
      {Object.entries(mapMarkersNodes).map(([k, node]) => (
        <React.Fragment key={k}>{node || null}</React.Fragment>
      ))}
    </div>
  )
})

TheMap.propTypes = {
  /** Class for tile layer */
  TileLayerClass: PropTypes.func,
  /** Enable dragging */
  draggingEnabled: PropTypes.bool,
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
  draggingEnabled: true,
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
