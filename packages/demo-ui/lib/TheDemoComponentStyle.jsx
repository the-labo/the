/**
 * Style for TheDemoComponent
 * @memberof module:@the-/demo-component
 * @function TheDemoComponentStyle
 */
'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'
import { asStyleData } from '@the-/util-component'

/** @lends TheDemoComponentStyle */
const TheDemoComponentStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-demo-component-style', className)}
    styles={TheDemoComponentStyle.data(options)}
  />
)

TheDemoComponentStyle.displayName = 'TheDemoComponentStyle'
TheDemoComponentStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheDemoComponentStyle.defaultProps = {
  options: {},
}

TheDemoComponentStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const { dominantColor = ThemeValues.dominantColor } = options
  return asStyleData({
    '.the-demo-component': {},
  })
}

export default TheDemoComponentStyle
