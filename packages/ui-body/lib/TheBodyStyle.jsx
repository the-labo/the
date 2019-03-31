'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'

/** Style for TheBody */
const TheBodyStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-body-style', className)}
    styles={TheBodyStyle.data(options)}
  />
)

TheBodyStyle.displayName = 'TheBodyStyle'
TheBodyStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheBodyStyle.defaultProps = {
  options: {},
}

TheBodyStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    backgroundColor = ThemeValues.backgroundColor,
    fontFamily = ThemeValues.fontFamily,
    fontSize = ThemeValues.fontSize,
    height = '100%',
    overflowScrolling = 'touch',
    textColor = ThemeValues.textColor,
  } = options
  return {
    '.the-body': {
      backgroundColor,
      boxSizing: 'border-box',
      color: textColor,
      fontFamily,
      fontSize,
      height,
      margin: 0,
      overflowScrolling,
      padding: 0,
      touchAction: 'manipulation',
    },
  }
}

export default TheBodyStyle
