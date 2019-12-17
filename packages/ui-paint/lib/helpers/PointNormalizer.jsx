'use strict'

import ResizePolicies from '../constants/ResizePolicies'

function PointNormalizer({
  height: containerHeight,
  resizePolicy,
  width: containerWidth,
}) {
  const normalizer = {
    normalize(point, options = {}) {
      const { size } = options
      const { height = containerHeight, width = containerWidth } = size || {}
      switch (resizePolicy) {
        case ResizePolicies.FIT: {
          const xRate = containerWidth / width
          const yRate = containerHeight / height
          return {
            x: point.x * xRate,
            y: point.y * yRate,
          }
        }
        case ResizePolicies.KEEP:
        default: {
          const xOffset = (containerWidth - width) / 2
          const yOffset = (containerHeight - height) / 2
          return {
            x: point.x + xOffset,
            y: point.y + yOffset,
          }
        }
      }
    },
    normalizeAll(points, options = {}) {
      return points.map((point) => {
        const { ...rest } = point
        const normalizedPoint = normalizer.normalize(
          { x: point.x, y: point.y },
          options,
        )
        return { ...rest, x: normalizedPoint.x, y: normalizedPoint.y }
      })
    },
  }
  return normalizer
}

export default PointNormalizer
