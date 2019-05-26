'use strict'

import uuid from 'uuid'
import CanvasAccess from './CanvasAccess'
import DrawerLayer from './DrawerLayer'
import DrawingMethods from '../constants/DrawingMethods'

class Drawer {
  constructor(canvas, tmpCanvas, options = {}) {
    const {
      id = uuid.v4(),
      lineCap = 'round',
      lineColor = '#888',
      lineJoin = 'round',
      lineWidth = 4,
    } = options
    this.id = id
    this.canvasAccess = new CanvasAccess(canvas)
    this.tmpCanvas = tmpCanvas
    this.lineWidth = lineWidth
    this.lineCap = lineCap
    this.lineJoin = lineJoin
    this.lineColor = lineColor
    this.layerHistories = []
    this.tmpLayer = null
    this.commitLayer = new DrawerLayer(canvas)
    this.active = false
    this.method = DrawingMethods.FREE
    this.resize()
  }

  set drawConfig(config) {
    Object.assign(this, { ...config })
  }

  get drawConfig() {
    const { lineCap, lineColor, lineJoin, lineWidth } = this
    return {
      lineCap,
      lineColor,
      lineJoin,
      lineWidth,
    }
  }

  clear() {
    this.canvasAccess.clear()
    const { background, layer } = this
    if (layer) {
      layer.canvasAccess.clear()
    }
    if (background) {
      this.drawBackground(background)
    }
  }

  draw({ x, y }) {
    this.tmpLayer.draw({ x, y })
  }

  drawBackground(background, options = {}) {
    const { canvasAccess } = this
    const {
      height = background.height || canvasAccess.height,
      width = background.width || canvasAccess.width,
    } = options
    canvasAccess.drawImage(background, { height, width })
  }

  end() {
    this.active = false
    this.flush()
    if (this.tmpLayer) {
      this.tmpLayer.tearDown()
      this.tmpLayer = null
    }
  }

  flush() {
    const { layerHistories, tmpLayer } = this
    if (!tmpLayer) {
      return
    }
    const layerHistory = tmpLayer.serialize()
    layerHistories.push(layerHistory)
    this.commitLayer.restore(layerHistory)
  }

  resize() {
    const { canvasAccess } = this
    const { height, width } = canvasAccess.canvas.getBoundingClientRect()
    const snapshot = this.snapshot()
    const changed =
      canvasAccess.width !== width || canvasAccess.height !== height
    if (changed) {
      canvasAccess.setSize({ height, width })
      void this.fromSnapshot(snapshot)
    }
  }

  snapshot() {
    const { background, drawConfig, layerHistories } = this
    const snapshotId = uuid.v4()
    return {
      background: background ? background.src : null,
      config: drawConfig,
      id: snapshotId,
      layers: [...layerHistories],
    }
  }

  start({ x, y }) {
    this.active = true
    const { tmpCanvas } = this
    const {
      canvasAccess: { height, width },
    } = this
    this.tmpLayer = new DrawerLayer(tmpCanvas, {
      method: this.method,
    })
    this.tmpLayer.setUp({
      config: this.drawConfig,
      height,
      width,
      x,
      y,
    })
  }

  toSVG() {
    return this.canvasAccess.toSVG()
  }

  async fromSnapshot(snapshot) {
    await this.fromSnapshotReady
    this.fromSnapshotReady = (async () => {
      this.clear()
      const { background, config, layers: layerHistories } = snapshot
      if (background) {
        await this.registerBackground(background)
      }
      for (const layersHistory of layerHistories) {
        this.commitLayer.restore(layersHistory)
      }

      this.drawConfig = config
      this.layerHistories = layerHistories
    })()
    await this.fromSnapshotReady
  }

  async registerBackground(background, options = {}) {
    if (typeof background === 'string') {
      const src = String(background)
      background = await new Promise((resolve, reject) => {
        const image = new Image()
        image.crossorigin = true
        image.onload = () => resolve(image)
        image.onerror = (e) => reject(e)
        image.src = src
      })
    }
    this.background = background
    this.drawBackground(background, options)
  }
}

export default Drawer
