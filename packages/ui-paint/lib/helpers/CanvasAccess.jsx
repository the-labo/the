'use strict'

import { get } from '@the-/window'

class CanvasAccess {
  constructor(canvas) {
    this.canvas = canvas
    this.scaleFactor = get('window.devicePixelRatio') || 2
  }

  get ctx() {
    const { canvas } = this
    return canvas.getContext('2d')
  }

  get height() {
    return this.canvas.height / this.scaleFactor
  }

  get width() {
    return this.canvas.width / this.scaleFactor
  }

  clear() {
    const { ctx, height, width } = this
    if (!ctx) {
      return
    }
    ctx.clearRect(0, 0, width, height)
  }

  configure(config) {
    const { lineCap, lineColor, lineJoin, lineWidth } = config
    const { ctx } = this
    ctx.lineCap = lineCap
    ctx.lineJoin = lineJoin
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
  }

  copyFrom(canvasAccess) {
    const { height, width } = canvasAccess
    const image = new Image()
    image.src = canvasAccess.toSVG()
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, width, height)
    }
  }

  drawImage(image, options = {}) {
    const {
      height = image.height || this.height,
      width = image.width || this.width,
    } = options
    this.ctx.drawImage(
      image,
      (this.width - width) / 2,
      (this.height - height) / 2,
      width,
      height,
    )
  }

  setSize({ height, width }) {
    const { canvas, ctx, scaleFactor } = this
    canvas.width = width * scaleFactor
    canvas.height = height * scaleFactor
    ctx.scale(scaleFactor, scaleFactor)
  }

  toSVG() {
    return this.canvas.toDataURL('image/svg+xml')
  }
}

export default CanvasAccess
