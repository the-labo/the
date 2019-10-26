'use strict'

import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import TheMapMarker from '../TheMapMarker'

const { tappableHeight: tappableSize } = ThemeValues

export default function markerNodeFor({
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
