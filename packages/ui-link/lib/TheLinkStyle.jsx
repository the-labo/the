'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'

/** Style for TheLink */
const TheLinkStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-link-style', className)}
    id={id}
    styles={TheLinkStyle.data(options)}
  />
)

TheLinkStyle.displayName = 'TheLinkStyle'
TheLinkStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheLinkStyle.defaultProps = {
  options: {},
}

TheLinkStyle.data = (options) => {
  const { dominantColor = ThemeValues.dominantColor } = options
  return {
    '.the-link': {
      color: dominantColor,
      display: 'inline-block',
      padding: '0px 4px',
    },
    '.the-link-active': {
      textDecoration: 'none',
    },
  }
}

export default TheLinkStyle
