/**
 * @memberof module:@the-/icon.helpers
 * @namespace drawer
 */
'use strict'

/** @lends module:@the-/icon.helpers.drawer */
const drawer = {
  drawRect(
    canvas,
    {
      cx,
      cy,
      fill,
      height = canvas.height,
      lineWidth = 4,
      r,
      stroke,
      width = canvas.width,
    },
  ) {
    const ctx = canvas.getContext('2d')
    ctx.save()
    const w2 = width / 2
    const h2 = height / 2
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    const left = cx - w2 + lineWidth / 2
    const top = cy - h2 + lineWidth / 2
    const right = cx + w2 - lineWidth / 2
    const bottom = cy + h2 - lineWidth / 2
    ctx.moveTo(left + r, top)
    ctx.arcTo(right, top, right, bottom, r)
    ctx.arcTo(right, bottom, left, bottom, r)
    ctx.arcTo(left, bottom, left, top, r)
    ctx.arcTo(left, top, right, top, r)
    ctx.closePath()
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }
    if (stroke) {
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
    ctx.restore()
  },
  drawText(
    canvas,
    { color, cx, cy, fontFamily, maxWidth = canvas.width, text },
  ) {
    const ctx = canvas.getContext('2d')
    const maxWidthRate = 0.8
    const shrinkRate = 0.9
    ctx.save()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    let fontSize = maxWidth * maxWidthRate
    while (fontSize > 5) {
      ctx.font = `${fontSize}px "${fontFamily}"`
      const enough = ctx.measureText(text).width < maxWidth * maxWidthRate
      if (enough) {
        break
      }
      fontSize = parseInt(fontSize * shrinkRate)
    }
    ctx.fillStyle = color
    ctx.fillText(text, cx, cy)
    ctx.restore()
  },
}

module.exports = drawer
