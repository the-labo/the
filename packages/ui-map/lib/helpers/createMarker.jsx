'use strict'

import c from 'classnames'
import L from '@okunishinishi/leaflet-shim'
import { ThemeValues } from '@the-/const-ui'
import markerNodeFor from './markerNodeFor'
import DivIcon from '../classes/DivIcon'

const { tappableHeight: tappableSize } = ThemeValues

export default function createMarker(options = {}) {
  const {
    className,
    draggable = false,
    height = tappableSize,
    interactive,
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
  marker.node = markerNodeFor({ height, marker, node, onClick, width })
  return marker
}
