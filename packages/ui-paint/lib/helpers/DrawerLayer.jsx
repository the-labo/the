'use strict'

import Debug from 'debug'
import CanvasAccess from './CanvasAccess'
import CircleDrawMethod from './methods/CircleDrawMethod'
import FreeDrawMethod from './methods/FreeDrawMethod'
import RectDrawMethod from './methods/RectDrawMethod'
import StraightDrawMethod from './methods/StraightDrawMethod'
import DrawingMethods from '../constants/DrawingMethods'
import ResizePolicies from '../constants/ResizePolicies'

const debug = Debug('the:paint:DrawerLayer')

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
    applyConfig(config) {
      state.config = { ...config }
      canvasAccess.configure(config)
    },
    applyObject(object) {
      const { erasing, points } = object
      if (points.length === 0) {
        return
      }
      canvasAccess.apply(() => {
        canvasAccess.setErasing(erasing)
        const method = erasing ? DrawingMethods.FREE : state.config.method
        switch (method) {
          case DrawingMethods.CIRCLE:
            CircleDrawMethod(ctx, points)
            break
          case DrawingMethods.RECT:
            RectDrawMethod(ctx, points)
            break
          case DrawingMethods.STRAIGHT:
            StraightDrawMethod(ctx, points)
            break
          case DrawingMethods.FREE:
          default:
            FreeDrawMethod(ctx, points)
            break
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
    normalizeConfig(config, options = {}) {
      const { size } = options
      const {
        config: { resizePolicy },
      } = state
      const { height = canvasAccess.height, width = canvasAccess.width } =
        size || {}
      switch (resizePolicy) {
        case ResizePolicies.FIT: {
          const xRate = canvasAccess.width / width
          const yRate = canvasAccess.height / height
          return {
            ...config,
            lineWidth: config.lineWidth * Math.min(xRate, yRate),
          }
        }
        case ResizePolicies.KEEP:
        default: {
          return config
        }
      }
    },
    normalizeObjects(objects, options = {}) {
      return objects
        .filter((object) => object.points.length > 0)
        .map((object) => ({
          ...object,
          points: object.points.map((point) => {
            const { x, y, ...rest } = point
            const normalizedPoint = layer.normalizePoint(
              { x: point.x, y: point.y },
              options,
            )
            return { ...rest, x: normalizedPoint.x, y: normalizedPoint.y }
          }),
        }))
    },
    normalizePoint(point, options = {}) {
      const { size } = options
      const {
        config: { resizePolicy },
      } = state
      const { height = canvasAccess.height, width = canvasAccess.width } =
        size || {}
      switch (resizePolicy) {
        case ResizePolicies.FIT: {
          const xRate = canvasAccess.width / width
          const yRate = canvasAccess.height / height
          return {
            x: point.x * xRate,
            y: point.y * yRate,
          }
        }
        case ResizePolicies.KEEP:
        default: {
          const xOffset = (canvasAccess.width - width) / 2
          const yOffset = (canvasAccess.height - height) / 2
          return {
            x: point.x + xOffset,
            y: point.y + yOffset,
          }
        }
      }
    },
    restore(serialized) {
      const {
        config,
        image,
        objects = [
          {
            erasing: false,
            points: serialized.points,
          },
        ],
        size,
      } = serialized
      layer.applyConfig(layer.normalizeConfig(config, { size }))
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
      const { config, objects } = state
      layer.applyConfig(config)
      const { height, width } = canvasAccess
      return {
        config: { ...config },
        image: canvasAccess.toSVG(),
        objects: [...objects],
        size: { height, width },
      }
    },
    setUp({ config, height, width, x, y }) {
      debug('setup', config, height, width)
      canvasAccess.setSize({ height, width })
      canvasAccess.pathStart(x, y)
      layer.applyConfig(config)
    },
    tearDown() {
      debug('teardown')
      canvasAccess.pathClose()
      canvasAccess.clear()
    },
  }
  return layer
}

export default DrawerLayer
