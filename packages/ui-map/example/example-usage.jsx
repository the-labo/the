'use strict'

import React, { useCallback, useMemo, useState } from 'react'
import { TheMap, TheMapPositionInput } from '@the-/ui-map'
import { TheMapStyle } from '@the-/ui-map/styles'
import { TheSpinStyle } from '@the-/ui-spin/styles'

// @see https://leaflet-extras.github.io/leaflet-providers/preview/
const MapLayers = [
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    key: 'layer01',
    maxZoom: 19,
    title: 'Layer 01',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    key: 'layer02',
    maxZoom: 18,
    title: 'Layer 02',
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  },
]

const ExampleComponent = () => {
  const tmp = useMemo(() => ({}), [])
  const [target, setTarget] = useState({
    lat: 35.6895,
    lng: 139.6917,
    zoom: 13,
  })
  const [markers, setMarkers] = useState([
    {
      key: 'marker-01',
      lat: 51.505,
      lng: -0.09,
      node: (
        <div
          style={{
            background: '#E33',
            borderRadius: '50%',
            color: 'white',
            height: 48,
            lineHeight: '48px',
            textAlign: 'center',
            width: 48,
          }}
        >
          <div>Mrkr01</div>
        </div>
      ),
      onClick: () => console.log('marker01 clicked'),
    },
    {
      key: 'me',
      lat: 35.68184060244455,
      lng: 139.64172363281253,
      node: <h5 style={{ background: 'green', color: 'white' }}>this is me</h5>,
    },
  ])

  tmp.markers = markers

  const getMarker = useCallback(
    (key) => tmp.markers.find((m) => m.key === key),
    [tmp],
  )

  const [polylines] = useState([
    {
      color: 'red',
      key: 'polyline-01',
      positions: new Array(100)
        .fill({
          lat: 35.6895,
          lng: 139.6917,
        })
        .map(({ lat, lng }, i) => [
          lat + i * Math.random(),
          lng + i * Math.random(),
        ]),
    },
  ])

  const setMarker = useCallback(
    (key, values) => {
      setMarkers([
        ...tmp.markers.filter((m) => m.key !== key),
        { key, ...values },
      ])
    },
    [tmp],
  )

  const [popups] = useState([
    {
      for: 'marker-01',
      key: 'popup-01',
      node: <div>This is popup01 for marker01</div>,
    },
  ])

  const handleChange = useCallback(
    ({ bounds: { east, north, south, west }, lat, lng, zoom }) => {
      setTarget({ lat, lng, zoom })
      console.log('bounds changed', { east, north, south, west })
    },
    [],
  )

  const handleClick = useCallback(
    ({ lat, lng }) => {
      console.log('Map clicked', { lat, lng })
      const name = `m${String(markers.length + 1).padStart(2, '0')}`
      const markerValues = {
        lat,
        lng,
        node: (
          <div
            style={{
              background: '#EE1',
              borderRadius: '50%',
              color: 'white',
              height: 22,
              lineHeight: '22px',
              textAlign: 'center',
              width: 22,
            }}
          >
            <div>{name}</div>
          </div>
        ),
        onClick: () => console.log('node clicked', name),
      }
      setMarker(name, markerValues)

      const timer = setInterval(() => {
        const marker = getMarker(name)
        const lng = marker.lng + 0.001
        const lat = marker.lat + 0.001
        setMarker(name, {
          ...marker,
          lat,
          lng,
        })
        console.log('Marker moved', name, { lat, lng })
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    },
    [markers, setMarker],
  )

  const handleLeafletMap = useCallback((map) => {
    tmp.map = map
  }, [])

  const [post01, setPost01] = useState({
    lat: 0,
    lng: 0,
    zoom: 1,
  })
  const handleUpdate = useCallback(
    ({ pos01 }) => {
      const { lat, lng, zoom } = pos01
      setPost01({ lat, lng, zoom })
    },
    [setPost01],
  )

  const moveToCurrent = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords
        this.setState({ lat, lng })
      },
      () => alert('Failed to get current position'),
    )
  }, [])

  const { lat, lng, zoom } = target
  return (
    <div>
      <TheSpinStyle />
      <TheMapStyle />
      <TheMap
        height='50vh'
        lat={lat}
        layers={MapLayers}
        lng={lng}
        markers={markers}
        onChange={handleChange}
        onClick={handleClick}
        onLeafletMap={handleLeafletMap}
        polylines={polylines}
        popups={popups}
        width='480px'
        zoom={zoom}
      />

      <hr />

      <button onClick={moveToCurrent}>Move to current</button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <section>
        <h1>As Input</h1>
        <TheMapPositionInput
          name='pos01'
          onUpdate={handleUpdate}
          value={post01}
        />
      </section>
    </div>
  )
}

export default ExampleComponent

/* global alert */
