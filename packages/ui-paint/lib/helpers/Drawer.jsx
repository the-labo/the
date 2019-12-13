'use strict'

import uuid from 'uuid'
import CanvasAccess from './CanvasAccess'
import DrawerLayer from './DrawerLayer'
import loadImage from './loadImage'
import DrawConfigs from '../constants/DrawConfigs'
import DrawingMethods from '../constants/DrawingMethods'
import ResizePolicies from '../constants/ResizePolicies'

function Drawer(canvas, tmpCanvas, options = {}) {
  const canvasAccess = CanvasAccess(canvas)

  const config = {
    erasing: false,
    globalCompositeOperation: 'source-over',
    lineCap: 'round',
    lineColor: DrawConfigs.DEFAULT_LINE_COLOR,
    lineJoin: 'round',
    lineWidth: DrawConfigs.DEFAULT_LINE_WIDTH,
    method: DrawingMethods.FREE,
    resizePolicy: ResizePolicies.KEEP,
    ...options,
  }

  const commitLayer = DrawerLayer(canvas)
  commitLayer.applyConfig(config)
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
    get config() {
      return config
    },
    clear() {
      canvasAccess.clear()
      state.tmpLayer && state.tmpLayer.clear()
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
      if (config.erasing) {
        drawer.flushCommitLayer()
      } else {
        drawer.flushTmpLayer()
        state.tmpLayer.tearDown()
        state.tmpLayer = null
      }
    },
    flushCommitLayer() {
      const { layerHistories } = state
      const layerHistory = commitLayer.serialize()
      layerHistories.push(layerHistory)
      commitLayer.restoreAll(layerHistories)
    },
    flushTmpLayer() {
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
      const { height, width } = canvasAccess
      if (config.erasing) {
        commitLayer.addObject({ erasing: true })
        commitLayer.applyConfig(config)
      } else {
        state.tmpLayer = DrawerLayer(tmpCanvas, {})
        state.tmpLayer.setUp({
          config,
          height,
          width,
          x,
          y,
        })
        state.tmpLayer.addObject({})
      }
    },
    toSVG() {
      return canvasAccess.toSVG()
    },
    async fromSnapshot(snapshot) {
      await state.fromSnapshotReady
      const { config: originalConfig } = drawer
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

      drawer.setConfig(originalConfig)
      await state.fromSnapshotReady
    },
    async registerBackground(background, options = {}) {
      background = await loadImage(background)
      state.background = background
      drawer.drawBackground(background, options)
    },
    async resize() {
      state.resizing = true
      await canvasAccess.resizeAnd(async () => {
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
