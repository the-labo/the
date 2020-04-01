'use strict'

function FreeDrawMethod(ctx, points) {
  const enough = points.length >= 3
  if (!enough) {
    const [{ x, y }] = points
    ctx.beginPath()
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, !0)
    ctx.fill()
    return
  }

  ctx.beginPath()

  // Begin point
  {
    const [start] = points
    ctx.moveTo(start.x, start.y)
  }

  for (let i = 1; i < points.length - 2; i++) {
    const from = points[i]
    const to = points[i + 1]
    const cx = (from.x + to.x) / 2
    const cy = (from.y + to.y) / 2

    ctx.quadraticCurveTo(from.x, from.y, cx, cy)
  }

  // Care last lines
  {
    const last2 = points[points.length - 2]
    const last = points[points.length - 1]
    ctx.quadraticCurveTo(last2.x, last2.y, last.x, last.y)
  }

  ctx.stroke()
}

export default FreeDrawMethod
