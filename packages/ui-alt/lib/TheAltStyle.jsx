'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheAlt */
const TheAltStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-alt-style', className)}
    styles={TheAltStyle.data(options)}
  />
)

TheAltStyle.displayName = 'TheAltStyle'
TheAltStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheAltStyle.defaultProps = {
  options: {},
}

TheAltStyle.data = (options) => {
  const {
    altTextColor = ThemeValues.altTextColor || '#AAA',
    dominantColor = ThemeValues.dominantColor,
  } = options
  return asStyleData({
    '.the-alt': {
      color: altTextColor,
      fontSize: '1.25em',
      margin: '32px auto',
      textAlign: 'center',
    },
  })
}

export default TheAltStyle
