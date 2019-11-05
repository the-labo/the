'use strict'

import uuid from 'uuid'
import CanvasAccess from './CanvasAccess'
import DrawerLayer from './DrawerLayer'
import loadImage from './loadImage'
import DrawingMethods from '../constants/DrawingMethods'

class Drawer {
  constructor(canvas, tmpCanvas, options = {}) {
    const {
      globalCompositeOperation = 'source-over',
      id = uuid.v4(),
      lineCap = 'round',
      lineColor = '#888',
      lineJoin = 'round',
      lineWidth = 4,
      method = DrawingMethods.FREE,
    } = options
    this.id = id
    this.canvasAccess = CanvasAccess(canvas)
    this.tmpCanvas = tmpCanvas
    this.lineWidth = lineWidth
    this.lineCap = lineCap
    this.lineJoin = lineJoin
    this.lineColor = lineColor
    this.layerHistories = []
    this.tmpLayer = null
    this.commitLayer = DrawerLayer(canvas)
    this.active = false
    this.method = method
    this.globalCompositeOperation = globalCompositeOperation
    this.resize()
  }

  set drawConfig(config) {
    Object.assign(this, { ...config })
  }

  get drawConfig() {
    const {
      globalCompositeOperation,
      lineCap,
      lineColor,
      lineJoin,
      lineWidth,
    } = this
    return {
      globalCompositeOperation,
      lineCap,
      lineColor,
      lineJoin,
      lineWidth,
    }
  }

  clear() {
    this.canvasAccess.clear()
    this.tmpLayer && this.tmpLayer.clear()
    this.layerHistories = []
    const { background } = this
    if (background) {
      this.drawBackground(background)
    }
  }

  draw({ erasing, x, y }) {
    if (erasing) {
      this.commitLayer.draw(
        { erasing, x, y },
        {
          clear: false,
        },
      )
    } else {
      this.tmpLayer.draw({ x, y })
    }
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
    const { commitLayer, layerHistories, tmpLayer } = this
    if (!tmpLayer) {
      return
    }

    if (tmpLayer.empty) {
      return
    }

    const layerHistory = tmpLayer.serialize()
    layerHistories.push(layerHistory)
    commitLayer.restore(layerHistory)
  }

  resizeRequest() {
    if (this.resizing) {
      return
    }

    void this.resize()
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
    const {
      canvasAccess: { height, width },
      tmpCanvas,
    } = this
    this.tmpLayer = DrawerLayer(tmpCanvas, {
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

      this.commitLayer.restoreAll(layerHistories)

      this.drawConfig = config
      this.layerHistories = layerHistories
    })()
    await this.fromSnapshotReady
  }

  async registerBackground(background, options = {}) {
    background = await loadImage(background)
    this.background = background
    this.drawBackground(background, options)
  }

  async resize() {
    this.resizing = true

    const { canvasAccess } = this
    const { height, width } = canvasAccess.getBoundingClientRect()
    const snapshot = this.snapshot()
    const changed =
      canvasAccess.width !== width || canvasAccess.height !== height
    if (changed) {
      canvasAccess.setSize({ height, width })
      await this.fromSnapshot(snapshot)
    }

    this.resizing = false
  }
}

export default Drawer
