/**
 * @class DrawerLayer
 */
'use strict'

import CanvasAccess from './CanvasAccess'
import FreeDrawMethod from './methods/FreeDrawMethod'
import StraightDrawMethod from './methods/StraightDrawMethod'
import DrawingMethods from '../constants/DrawingMethods'

/** @lends DrawerLayer */
class DrawerLayer {
  constructor(canvas, options = {}) {
    const { method } = options
    this.canvasAccess = new CanvasAccess(canvas)
    this.method = method
    this.points = []
  }

  applyPoints(points) {
    const { canvasAccess, method } = this
    if (points.length === 0) {
      return
    }
    const { ctx } = canvasAccess
    switch (method || DrawingMethods.FREE) {
      case DrawingMethods.FREE:
        FreeDrawMethod(ctx, points)
        break
      case DrawingMethods.STRAIGHT:
        StraightDrawMethod(ctx, points)
        break
      default:
        throw new Error(`[Drawer] Unknown method: ${method}`)
    }
  }

  draw({ x, y }) {
    const { canvasAccess, points } = this
    points.push({ x, y })
    canvasAccess.clear()
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
    const { canvasAccess, config, method, points } = this
    const { height, width } = canvasAccess
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
    const { ctx } = this.canvasAccess
    ctx.save()
    ctx.moveTo(x, y)
    ctx.beginPath()
    this.config = { ...config }
    this.canvasAccess.configure(config)
  }

  tearDown() {
    const { ctx } = this.canvasAccess
    ctx.restore()
    this.canvasAccess.clear()
  }
}

export default DrawerLayer
