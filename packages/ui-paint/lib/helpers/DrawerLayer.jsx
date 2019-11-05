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
    objects: [],
  }

  const layer = {
    get empty() {
      return state.objects.length === 0
    },
    addObject(options = {}) {
      const { erasing = false, points = [] } = options
      state.objects.push({ erasing, points })
    },
    addPoint(point, options = {}) {
      const { clear = true } = options
      const object = state.objects[state.objects.length - 1]
      object.points.push(point)
      if (clear) {
        canvasAccess.clear()
      }
      layer.applyObjects(state.objects)
    },
    applyObject(object) {
      const { erasing, points } = object
      if (points.length === 0) {
        return
      }
      canvasAccess.apply(() => {
        canvasAccess.setErasing(erasing)
        const method = erasing ? DrawingMethods.FREE : state.method
        switch (method) {
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
            throw new Error(`[Drawer] Unknown method: ${state.method}`)
        }
      })
    },
    applyObjects(objects) {
      if (objects.length === 0) {
        return
      }

      for (const object of objects) {
        layer.applyObject(object)
      }
    },
    clear() {
      canvasAccess.clear()
    },
    normalizeObjects(objects, options = {}) {
      const { size } = options
      const { height = canvasAccess.height, width = canvasAccess.width } =
        size || {}
      const xOffset = (canvasAccess.width - width) / 2
      const yOffset = (canvasAccess.height - height) / 2
      return objects
        .filter((object) => object.points.length > 0)
        .map((object) => ({
          ...object,
          points: object.points.map((point) => {
            const { x, y, ...rest } = point
            return {
              x: x + xOffset,
              y: y + yOffset,
              ...rest,
            }
          }),
        }))
    },
    restore(serialized) {
      const {
        config,
        image,
        method,
        objects = [
          {
            erasing: false,
            points: serialized.points,
          },
        ],
        size,
      } = serialized
      state.method = method
      state.config = config
      canvasAccess.configure(config)
      state.objects = objects
      if (objects) {
        const normalizedObjects = layer.normalizeObjects(objects, { size })
        layer.applyObjects(normalizedObjects)
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
      const { config, method, objects } = state

      const { height, width } = canvasAccess
      return {
        config: { ...config },
        image: canvasAccess.toSVG(),
        method,
        objects: [...objects],
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
