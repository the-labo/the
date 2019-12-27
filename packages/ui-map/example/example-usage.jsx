'use strict'

import React from 'react'
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

class ExampleComponent extends React.Component {
  handleChange = ({ bounds: { east, north, south, west }, lat, lng, zoom }) => {
    this.setState({ lat, lng, zoom })
    console.log('bounds changed', { east, north, south, west })
  }

  handleClick = ({ lat, lng }) => {
    const {
      state: { markers },
    } = this
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
    this.setMarker(name, markerValues)

    setInterval(() => {
      const marker = this.getMarker(name)
      const lng = marker.lng + 0.001
      const lat = marker.lat + 0.001
      this.setMarker(name, {
        ...marker,
        lat,
        lng,
      })
      console.log('Marker moved', name, { lat, lng })
    }, 1000)
  }

  handleLeafletMap = (map) => {
    this.map = map
  }

  handleUpdate = ({ pos01 }) => {
    const { lat, lng, zoom } = pos01
    this.setState({
      post01: { lat, lng, zoom },
    })
  }

  moveToCurrent = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords
        this.setState({ lat, lng })
      },
      () => alert('Failed to get current position'),
    )
  }

  state = {
    lat: 35.6895,
    lng: 139.6917,
    markers: [
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
    ],
    polylines: [
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
    ],
    popups: [
      {
        for: 'marker-01',
        key: 'popup-01',
        node: <div>This is popup01 for marker01</div>,
      },
    ],
    zoom: 13,
  }

  getMarker(key) {
    return this.state.markers.find((m) => m.key === key)
  }

  render() {
    const {
      state: { lat, lng, markers, polylines, post01, zoom },
    } = this
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
          onChange={this.handleChange}
          onClick={this.handleClick}
          onLeafletMap={this.handleLeafletMap}
          polylines={polylines}
          width='480px'
          zoom={zoom}
        />

        <hr />

        <button onClick={this.moveToCurrent}>Move to current</button>

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
            onUpdate={this.handleUpdate}
            value={post01}
          />
        </section>
      </div>
    )
  }

  setMarker(key, values) {
    const {
      state: { markers },
    } = this
    this.setState({
      markers: [...markers.filter((m) => m.key !== key), { key, ...values }],
    })
  }
}

export default ExampleComponent

/* global alert */
