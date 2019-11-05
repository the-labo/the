'use strict'

import CanvasAccess from './CanvasAccess'
import CircleDrawMethod from './methods/CircleDrawMethod'
import FreeDrawMethod from './methods/FreeDrawMethod'
import RectDrawMethod from './methods/RectDrawMethod'
import StraightDrawMethod from './methods/StraightDrawMethod'
import DrawingMethods from '../constants/DrawingMethods'

/**
 * @function DrawerLayer
 * @param canvas
 * @param [options={}]
 * @returns {Object}
 */
function DrawerLayer(canvas, options = {}) {
  const canvasAccess = CanvasAccess(canvas)
  const { ctx } = canvasAccess
  const state = {
    method: options.method || DrawingMethods.FREE,
    points: [],
  }

  const layer = {
    get empty() {
      return state.points.length === 0
    },
    applyPoints(points) {
      if (points.length === 0) {
        return
      }

      const pointGroups = points.reduce((reduced, point) => {
        const [last] = reduced
        const { erasing = false } = point
        const changed = !last || last.erasing !== erasing
        if (changed) {
          reduced.push({ erasing, points: [point] })
        } else {
          last.points.push(point)
        }

        return reduced
      }, [])
      for (const { erasing, points } of pointGroups) {
        ctx.save()
        ctx.globalCompositeOperation = erasing
          ? 'destination-out'
          : 'source-over'
        switch (state.method || DrawingMethods.FREE) {
          case DrawingMethods.CIRCLE:
            CircleDrawMethod(ctx, points)
            break
          case DrawingMethods.FREE:
            FreeDrawMethod(ctx, points)
            break
          case DrawingMethods.RECT:
            RectDrawMethod(ctx, points)
            break
          case DrawingMethods.STRAIGHT:
            StraightDrawMethod(ctx, points)
            break
          default:
            throw new Error(`[Drawer] Unknown method: ${method}`)
        }

        ctx.restore()
      }
    },
    clear() {
      canvasAccess.clear()
    },
    draw(point, options = {}) {
      const { clear = true } = options
      state.points.push(point)
      if (clear) {
        canvasAccess.clear()
      }

      layer.applyPoints(state.points)
    },
    normalizePoints(points, options = {}) {
      const { size } = options
      const { height = canvasAccess.height, width = canvasAccess.width } =
        size || {}
      const xOffset = (canvasAccess.width - width) / 2
      const yOffset = (canvasAccess.height - height) / 2
      return points.map((point) => {
        const { x, y, ...rest } = point
        return {
          x: x + xOffset,
          y: y + yOffset,
          ...rest,
        }
      })
    },
    restore(serialized) {
      const { config, image, method, points, size } = serialized
      state.method = method
      state.config = config
      canvasAccess.configure(config)
      state.points = points
      if (points) {
        const normalizedPoints = layer.normalizePoints(points, { size })
        layer.applyPoints(normalizedPoints)
      } else if (image) {
        // TODO
      } else {
        console.warn('[DrawerLayer] Failed to restore', serialized)
      }
    },
    restoreAll(serializedArray) {
      for (const serialized of serializedArray) {
        layer.restore(serialized)
      }
    },
    serialize() {
      const { config, method, points } = state

      const { height, width } = canvasAccess
      return {
        config: { ...config },
        image: canvasAccess.toSVG(),
        method,
        points: [...points],
        size: { height, width },
      }
    },
    setUp({ config, height, width, x, y }) {
      canvasAccess.setSize({ height, width })
      canvasAccess.pathStart(x, y)
      state.config = { ...config }
      canvasAccess.configure(config)
    },
    tearDown() {
      canvasAccess.pathClose()
      canvasAccess.clear()
    },
  }
  return layer
}

export default DrawerLayer
