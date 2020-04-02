'use strict'

function StraightDrawMethod(ctx, points) {
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
  ctx.moveTo(start.x, start.y)
  ctx.lineTo(last.x, last.y)
  ctx.stroke()
}

export default StraightDrawMethod
