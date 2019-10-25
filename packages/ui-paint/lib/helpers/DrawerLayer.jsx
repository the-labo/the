'use strict'

import CanvasAccess from './CanvasAccess'
import CircleDrawMethod from './methods/CircleDrawMethod'
import FreeDrawMethod from './methods/FreeDrawMethod'
import RectDrawMethod from './methods/RectDrawMethod'
import StraightDrawMethod from './methods/StraightDrawMethod'
import DrawingMethods from '../constants/DrawingMethods'

/**
 * @class DrawerLayer
 */
class DrawerLayer {
  constructor(canvas, options = {}) {
    const { method } = options
    this.canvasAccess = CanvasAccess(canvas)
    this.method = method
    this.points = []
  }

  get empty() {
    const { points } = this
    return points.length === 0
  }

  applyPoints(points) {
    const { canvasAccess, method } = this
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
    const { ctx } = canvasAccess
    for (const { erasing, points } of pointGroups) {
      ctx.save()
      ctx.globalCompositeOperation = erasing ? 'destination-out' : 'source-over'
      switch (method || DrawingMethods.FREE) {
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
  }

  draw(point, options = {}) {
    const { clear = true } = options
    const { canvasAccess, points } = this
    points.push(point)
    if (clear) {
      canvasAccess.clear()
    }

    this.applyPoints(this.points)
  }

  normalizePoints(points, options = {}) {
    const { canvasAccess } = this
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
  }

  restore(serialized) {
    const { config, image, method, points, size } = serialized
    this.method = method
    this.config = config
    this.canvasAccess.configure(config)
    this.points = points
    if (points) {
      const normalizedPoints = this.normalizePoints(points, { size })
      this.applyPoints(normalizedPoints)
    } else if (image) {
      // TODO
    } else {
      console.warn('[DrawerLayer] Failed to restore', serialized)
    }
  }

  serialize() {
    const {
      canvasAccess,
      canvasAccess: { height, width },
      config,
      method,
      points,
    } = this

    return {
      config: { ...config },
      image: canvasAccess.toSVG(),
      method,
      points: [...points],
      size: { height, width },
    }
  }

  setUp({ config, height, width, x, y }) {
    this.canvasAccess.setSize({ height, width })
    const {
      canvasAccess: { ctx },
    } = this
    ctx.save()
    ctx.moveTo(x, y)
    ctx.beginPath()
    this.config = { ...config }
    this.canvasAccess.configure(config)
  }

  tearDown() {
    const {
      canvasAccess: { ctx },
    } = this
    ctx.closePath()
    ctx.restore()
    this.canvasAccess.clear()
  }
}

export default DrawerLayer
