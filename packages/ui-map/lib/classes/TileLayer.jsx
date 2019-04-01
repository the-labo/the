/**
 * @class TileLayer
 * @augments L.TileLayer
 */
'use strict'

import { get } from 'the-window'
import L from '@okunishinishi/leaflet-shim'

/** @lends TileLayer */
class TileLayer extends L.TileLayer {
  constructor() {
    super(...arguments)
    this.handlers = {}
  }

  bindHandlers() {
    for (const [event, handler] of Object.entries(this.handlers)) {
      this.on(event, handler)
    }
  }

  createTile(coords) {
    const document = get('document')
    const tile = document.createElement('div')
    tile.classList.add('the-map-tile')
    tile.classList.add('the-map-tile-loading')
    {
      const image = super.createTile(coords, (err) => {
        tile.classList.remove('the-map-tile-loading')
        if (err) {
          tile.classList.add('the-map-tile-failed')
        }
      })
      tile.appendChild(image)
    }
    {
      const loadingMsg = document.createElement('div')
      loadingMsg.classList.add('the-map-title-loading-msg')
      loadingMsg.innerHTML = `<i class="fas fa-spin fa-sync"/>`
      tile.appendChild(loadingMsg)
    }
    return tile
  }

  unbindHandlers() {
    for (const [event, handler] of Object.entries(this.handlers)) {
      this.off(event, handler)
    }
  }
}

export default TileLayer
