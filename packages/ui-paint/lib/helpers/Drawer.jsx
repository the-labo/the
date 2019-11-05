'use strict'

import uuid from 'uuid'
import CanvasAccess from './CanvasAccess'
import DrawerLayer from './DrawerLayer'
import loadImage from './loadImage'
import DrawingMethods from '../constants/DrawingMethods'

function Drawer(canvas, tmpCanvas, options = {}) {
  const canvasAccess = CanvasAccess(canvas)

  const config = {
    erasing: false,
    globalCompositeOperation: 'source-over',
    lineCap: 'round',
    lineColor: '#888',
    lineJoin: 'round',
    lineWidth: 4,
    method: DrawingMethods.FREE,
    ...options,
  }

  const commitLayer = DrawerLayer(canvas)
  const state = {
    active: false,
    background: null,
    fromSnapshotReady: null,
    id: uuid.v4(),
    layerHistories: [],
    resizing: false,
    tmpLayer: null,
  }

  const drawer = {
    get active() {
      return state.active
    },
    clear() {
      canvasAccess.clear()
      state.tmpLayer && state.tmpLayer.tearDown()
      state.layerHistories = []
      const { background } = state
      if (background) {
        drawer.drawBackground(background)
      }
    },
    draw({ x, y }) {
      if (config.erasing) {
        commitLayer.addPoint(
          { x, y },
          {
            clear: false,
          },
        )
        drawer.repaint()
      } else {
        state.tmpLayer.addPoint({ x, y })
      }
    },
    drawBackground(background, options = {}) {
      if (!background) {
        return
      }
      const {
        height = background.height || canvasAccess.height,
        width = background.width || canvasAccess.width,
      } = options
      canvasAccess.drawImage(background, { height, width })
    },
    end() {
      state.active = false
      drawer.flush()
      if (state.tmpLayer) {
        state.tmpLayer.tearDown()
        state.tmpLayer = null
      }
    },
    flush() {
      const { layerHistories, tmpLayer } = state
      if (!tmpLayer) {
        return
      }

      if (tmpLayer.empty) {
        return
      }

      const layerHistory = tmpLayer.serialize()
      layerHistories.push(layerHistory)
      commitLayer.restoreAll(layerHistories)
    },
    repaint() {
      commitLayer.clear()
      const { background } = state
      if (background) {
        drawer.drawBackground(background)
      }
      state.layerHistories.push(commitLayer.serialize())
      commitLayer.restoreAll(state.layerHistories)
    },
    resizeRequest() {
      if (state.resizing) {
        return
      }

      void drawer.resize()
    },
    setConfig(adding) {
      Object.assign(config, { ...adding })
    },
    snapshot() {
      const { background, layerHistories } = state
      const snapshotId = uuid.v4()
      return {
        background: background ? background.src : null,
        config,
        id: snapshotId,
        layers: [...layerHistories],
      }
    },
    start({ x, y }) {
      state.active = true
      if (config.erasing) {
        commitLayer.addObject({ erasing: true })
      }
      const { height, width } = canvasAccess
      state.tmpLayer = DrawerLayer(tmpCanvas, {
        method: config.method,
      })
      state.tmpLayer.setUp({
        config,
        height,
        width,
        x,
        y,
      })
      state.tmpLayer.addObject({})
    },
    toSVG() {
      return canvasAccess.toSVG()
    },
    async fromSnapshot(snapshot) {
      await state.fromSnapshotReady
      state.fromSnapshotReady = (async () => {
        drawer.clear()
        const { background, config, layers: layerHistories } = snapshot
        if (background) {
          await drawer.registerBackground(background)
        }

        commitLayer.restoreAll(layerHistories)

        drawer.setConfig(config)
        state.layerHistories = layerHistories
      })()
      await state.fromSnapshotReady
    },
    async registerBackground(background, options = {}) {
      background = await loadImage(background)
      state.background = background
      drawer.drawBackground(background, options)
    },
    async resize() {
      state.resizing = true
      canvasAccess.resizeAnd(async () => {
        const snapshot = drawer.snapshot()
        await drawer.fromSnapshot(snapshot)
      })
      state.resizing = false
    },
  }

  drawer.resize()

  return drawer
}

export default Drawer
