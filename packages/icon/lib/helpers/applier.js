/**
 * @memberof module:@the-/icon.helpers
 * @namespace applier
 */
'use strict'

const { textColorFor } = require('@the-/util-color')
const Themes = require('../Themes')

/** @lends module:@the-/icon.helpers.applier */
const applier = {
  [Themes.CIRCLE]: (
    icon,
    {
      borderRadius = icon.width / 2,
      borderWidth = icon.width / 50,
      color,
      text,
    },
  ) => {
    icon.setBackground({
      borderRadius,
      color: textColorFor(color),
      margin: borderWidth,
    })
    icon.setBorder({ borderRadius, color, width: borderWidth })
    icon.setText(text, { color })
  },
  [Themes.CIRCLE_FILL]: (
    icon,
    { borderRadius = icon.width / 2, color, text },
  ) => {
    icon.setBackground({ borderRadius, color, margin: 0 })
    icon.setText(text, { color: textColorFor(color) })
  },
  [Themes.ROUND]: (
    icon,
    {
      borderRadius = icon.width / 10,
      borderWidth = icon.width / 50,
      color,
      text,
    },
  ) => {
    icon.setBackground({
      borderRadius,
      color: textColorFor(color),
      margin: borderWidth,
    })
    icon.setBorder({ borderRadius, color, width: borderWidth })
    icon.setText(text, { color })
  },
  [Themes.ROUND_FILL]: (
    icon,
    { borderRadius = icon.width / 10, color, text },
  ) => {
    icon.setBackground({ borderRadius, color, margin: 0 })
    icon.setText(text, { color: textColorFor(color) })
  },
  [Themes.SQUARE]: (icon, { borderWidth = icon.width / 50, color, text }) => {
    icon.setBackground({ color: textColorFor(color), margin: borderWidth })
    icon.setBorder({ color, width: borderWidth })
    icon.setText(text, { color })
  },
  [Themes.SQUARE_FILL]: (icon, { color, text }) => {
    icon.setBackground({ color, margin: 0 })
    icon.setText(text, { color: textColorFor(color) })
  },
}

module.exports = applier
