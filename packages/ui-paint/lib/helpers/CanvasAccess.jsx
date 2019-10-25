'use strict'

import { get } from '@the-/window'

const CanvasAccess = (canvas) => {
  const scaleFactor = get('window.devicePixelRatio') || 2
  const ctx = canvas.getContext('2d')
  const canvasAccess = {
    get height() {
      return canvas.height / scaleFactor
    },
    get width() {
      return canvas.width / scaleFactor
    },
    ctx,
    clear() {
      const { height, width } = canvasAccess
      if (!ctx) {
        return
      }

      ctx.clearRect(0, 0, width, height)
    },
    configure(config) {
      const {
        globalCompositeOperation,
        lineCap,
        lineColor,
        lineJoin,
        lineWidth,
      } = config

      ctx.lineCap = lineCap
      ctx.lineJoin = lineJoin
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = lineColor
      ctx.globalCompositeOperation = globalCompositeOperation
    },
    copyFrom(canvasAccess) {
      const { height, width } = canvasAccess
      const image = new Image()
      image.src = canvasAccess.toSVG()
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height)
      }
    },
    drawImage(image, options = {}) {
      const {
        height = image.height || canvasAccess.height,
        width = image.width || canvasAccess.width,
      } = options
      ctx.drawImage(
        image,
        (canvasAccess.width - width) / 2,
        (canvasAccess.height - height) / 2,
        width,
        height,
      )
    },
    getBoundingClientRect() {
      return canvas.getBoundingClientRect()
    },
    setSize({ height, width }) {
      canvas.width = width * scaleFactor
      canvas.height = height * scaleFactor
      ctx.scale(scaleFactor, scaleFactor)
    },
    toSVG() {
      return canvas.toDataURL('image/svg+xml')
    },
  }
  return canvasAccess
}

export default CanvasAccess

/* global Image */
