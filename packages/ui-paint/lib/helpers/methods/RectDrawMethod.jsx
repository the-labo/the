'use strict'

function RectDrawMethod(ctx, points) {
  const enough = points.length >= 2
  if (!enough) {
    const [{ x, y }] = points
    ctx.beginPath()
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, !0)
    ctx.fill()
    return
  }

  ctx.beginPath()
  const [start] = points
  const last = points[points.length - 1]
  const [x1, x2] = [start.x, last.x].sort((a, b) => a - b)
  const [y1, y2] = [start.y, last.y].sort((a, b) => a - b)
  ctx.rect(x1, y1, x2 - x1, y2 - y1)
  ctx.stroke()
}

export default RectDrawMethod
