'use strict'

import ResizePolicies from '../constants/ResizePolicies'

function ConfigNormalizer({
  height: containerHeight,
  resizePolicy,
  width: containerWidth,
}) {
  return {
    normalize(config, options = {}) {
      const { size } = options
      const { height = containerHeight, width = containerWidth } = size || {}
      switch (resizePolicy) {
        case ResizePolicies.FIT: {
          const xRate = containerWidth / width
          const yRate = containerHeight / height
          return {
            ...config,
            lineWidth: config.lineWidth * Math.min(xRate, yRate),
          }
        }
        case ResizePolicies.KEEP:
        default: {
          return config
        }
      }
    },
  }
}

export default ConfigNormalizer
