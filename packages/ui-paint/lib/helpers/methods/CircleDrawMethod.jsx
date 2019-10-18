'use strict'

function CircleDrawMethod(ctx, points) {
  const enough = points.length >= 2
  if (!enough) {
    const [{ x, y }] = points
    ctx.beginPath()
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, !0)
    ctx.fill()
    ctx.closePath()
    return
  }

  ctx.beginPath()
  const [start] = points
  const last = points[points.length - 1]

  const cx = (start.x + last.x) / 2
  const cy = (start.y + last.y) / 2
  const radius =
    Math.sqrt((start.x - last.x) ** 2 + (start.y - last.y) ** 2) / 2
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

export default CircleDrawMethod
