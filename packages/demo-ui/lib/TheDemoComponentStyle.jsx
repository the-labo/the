/**
 * Style for TheDemoComponent
 * @memberof module:@the-/demo-component
 * @function TheDemoComponentStyle
 */
'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

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
  const { dominantColor = ThemeValues.dominantColor } = options
  return asStyleData({
    '.the-demo-component': {},
  })
}

export default TheDemoComponentStyle
