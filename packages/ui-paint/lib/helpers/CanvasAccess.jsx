'use strict'

import C2S from 'canvas2svg'
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
    apply(action) {
      ctx.save()
      ctx.beginPath()
      action()
      ctx.closePath()
      ctx.restore()
    },
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
      ctx.fillStyle = lineColor
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
    getSize() {
      const { height, width } = canvas.getBoundingClientRect()
      return { height, width }
    },
    pathClose() {
      ctx.closePath()
      ctx.restore()
    },
    pathStart(x, y) {
      ctx.save()
      ctx.moveTo(x, y)
      ctx.beginPath()
    },
    setErasing(erasing) {
      ctx.globalCompositeOperation = erasing ? 'destination-out' : 'source-over'
    },
    setSize({ height, width }) {
      canvas.width = width * scaleFactor
      canvas.height = height * scaleFactor
      ctx.scale(scaleFactor, scaleFactor)
    },
    toSVG() {
      const btoa = get('btoa')
      const { height, width } = canvas
      const converter = new C2S(width, height)
      converter.drawImage(canvas, 0, 0, width, height)
      const svgString = converter.getSerializedSvg()
      const base64 = btoa(svgString)
      return `data:image/svg+xml;base64,${base64}`
    },
    async resizeAnd(onResize) {
      const { height, width } = canvas.getBoundingClientRect()
      const changed =
        canvasAccess.width !== width || canvasAccess.height !== height
      if (changed) {
        canvasAccess.setSize({ height, width })
        if (onResize) {
          await onResize()
        }
      }
    },
  }
  return canvasAccess
}

export default CanvasAccess

/* global Image */
