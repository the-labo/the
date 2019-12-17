'use strict'

import CircleDrawMethod from '../methods/CircleDrawMethod'
import FreeDrawMethod from '../methods/FreeDrawMethod'
import RectDrawMethod from '../methods/RectDrawMethod'
import StraightDrawMethod from '../methods/StraightDrawMethod'
import DrawingMethods from '../../constants/DrawingMethods'

export default function applyDrawMethodToCtx(ctx, method, points) {
  switch (method) {
    case DrawingMethods.CIRCLE:
      CircleDrawMethod(ctx, points)
      break
    case DrawingMethods.RECT:
      RectDrawMethod(ctx, points)
      break
    case DrawingMethods.STRAIGHT:
      StraightDrawMethod(ctx, points)
      break
    case DrawingMethods.FREE:
    default:
      FreeDrawMethod(ctx, points)
      break
  }
}
