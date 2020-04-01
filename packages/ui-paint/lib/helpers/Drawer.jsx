'use strict'

import { v4 as uuid } from 'uuid'
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
    id: uuid(),
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
        state.tmpLayer && state.tmpLayer.addPoint({ x, y })
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
        if (state.tmpLayer) {
          state.tmpLayer.tearDown()
          state.tmpLayer = null
        }
      }
    },
    flushCommitLayer() {
      const { layerHistories } = state
      const layerHistory = { ...commitLayer.serialize() }
      const object = commitLayer.popObject()
      if (!object) {
        return
      }

      layerHistory.objects = [object]
      commitLayer.restoreAll([...layerHistories, layerHistory])
      commitLayer.applyConfig(config)
      layerHistory.image = commitLayer.toSVG()
      layerHistories.push(layerHistory)
    },
    flushTmpLayer() {
      const { layerHistories, tmpLayer } = state
      if (!tmpLayer) {
        return
      }

      if (tmpLayer.empty) {
        return
      }

      const layerHistory = { ...tmpLayer.serialize() }
      commitLayer.restoreAll([...layerHistories, layerHistory])
      layerHistory.image = commitLayer.toSVG()
      layerHistories.push(layerHistory)
    },
    resizeRequest() {
      if (state.resizing) {
        return
      }

      void drawer.resize()
    },
    setConfig(adding) {
      Object.assign(config, { ...adding })
      commitLayer.applyConfig(config)
    },
    snapshot() {
      const { background, layerHistories } = state
      const snapshotId = uuid()
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
        commitLayer.addObject({ config: { ...config }, erasing: true })
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
        drawer.draw({ x, y })
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
