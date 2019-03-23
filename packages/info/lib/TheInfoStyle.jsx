'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from 'the-component-util'
import { TheStyle } from 'the-style'

/** Style for TheInfo */
const TheInfoStyle = ({ className, id, options }) => (
  <TheStyle {...{ id }}
            className={classnames('the-info-style', className)}
            styles={TheInfoStyle.data(options)}
  />
)

TheInfoStyle.displayName = 'TheInfoStyle'
TheInfoStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheInfoStyle.defaultProps = {
  options: {},
}

TheInfoStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
  } = options
  return asStyleData({
    '.the-info': {
      display: 'block',
      margin: '0 auto',
      maxWidth: contentWidth,
    },
    '.the-info-header': {
      backgroundColor: lightBackgroundColor,
      borderBottom: `1px solid ${lightBorderColor}`,
      color: lightTextColor,
      fontSize: 'small',
      fontWeight: 'normal',
      margin: 0,
      padding: '1px 8px',
    },
    '.the-info-row': {
      alignItems: 'center',
      borderBottom: `1px solid ${lightBorderColor}`,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 4,
    },
    '.the-info-row-label': {
      color: lightTextColor,
      display: 'inline-block',
      flexShrink: 0,
      fontSize: 'smaller',
      maxWidth: '50%',
      overflow: 'hidden',
      padding: 4,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.the-info-row-value': {
      display: 'inline-block',
      overflow: 'hidden',
      padding: 4,
      textAlign: 'right',
      textOverflow: 'ellipsis',
    },
  })
}

export default TheInfoStyle
