'use strict'

import React from 'react'
import { TheMap, TheMapStyle, TheMapPositionInput } from 'the-map'
import { TheSpinStyle } from 'the-spin'

// @see https://leaflet-extras.github.io/leaflet-providers/preview/
const MapLayers = [
  {
    key: 'layer01',
    title: 'Layer 01',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  {
    key: 'layer02',
    title: 'Layer 02',
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
]

class ExampleComponent extends React.Component {
  handleLeafletMap = (map) => {
    this.map = map
  }
  handleChange = ({ lat, lng, zoom, bounds: { west, south, east, north } }) => {
    this.setState({ lat, lng, zoom })
    console.log('bounds changed', { west, south, east, north })
  }
  handleUpdate = ({ pos01 }) => {
    const { lat, lng, zoom } = pos01
    this.setState({
      post01: { lat, lng, zoom },
    })
  }

  moveToCurrent = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude: lat, longitude: lng } = coords
      this.setState({ lat, lng })
    }, () => alert('Failed to get current position'))
  }

  setMarker(key, values) {
    const { markers } = this.state
    this.setState({
      markers: [
        ...markers.filter((m) => m.key !== key),
        { key, ...values }
      ]
    })
  }

  getMarker(key) {
    return this.state.markers.find((m) => m.key === key)
  }

  handleClick = ({ lat, lng }) => {
    const { markers } = this.state
    console.log('Map clicked', { lat, lng })
    let name = `m${String(markers.length + 1).padStart(2, '0')}`
    let markerValues = {
      lat,
      lng,
      onClick: () => console.log('node clicked', name),
      node: (
        <div style={{
          borderRadius: '50%',
          textAlign: 'center',
          background: '#EE1',
          width: 22,
          height: 22,
          color: 'white',
          lineHeight: '22px',
        }}>
          <div>{name}</div>
        </div>
      ),
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

  state = {
    lat: 35.6895,
    lng: 139.6917,
    zoom: 13,
    markers: [
      {
        key: 'marker-01',
        lat: 51.505,
        lng: -0.09,
        onClick: () => console.log('marker01 clicked'),
        node: (
          <div style={{
            borderRadius: '50%',
            textAlign: 'center',
            background: '#E33',
            width: 48,
            height: 48,
            color: 'white',
            lineHeight: '48px',
          }}>
            <div>Mrkr01</div>
          </div>
        ),
      }
    ],
    popups: [
      {
        key: 'popup-01',
        for: 'marker-01',
        node: (
          <div>This is popup01 for marker01</div>
        )
      }
    ]
  }

  render() {
    const { state: { lat, lng, zoom, markers, post01 } } = this
    return (
      <div>
        <TheSpinStyle />
        <TheMapStyle />
        <TheMap onLeafletMap={this.handleLeafletMap}
                onChange={this.handleChange}
                {...{ lat, lng, zoom }}
                width={'480px'}
                height={'50vh'}
                layers={MapLayers}
                onClick={this.handleClick}
                markers={markers}
        >
        </TheMap>

        <hr />

        <button
          onClick={this.moveToCurrent}>Move to current
        </button>


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
          <TheMapPositionInput value={post01}
                               name={'pos01'}
                               onUpdate={this.handleUpdate}
          />
        </section>
      </div>

    )
  }
}

export default ExampleComponent
