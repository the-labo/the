'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheIcon */
const TheIconStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-icon-style', className)}
    styles={TheIconStyle.data(options)}
  />
)

TheIconStyle.displayName = 'TheIconStyle'
TheIconStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheIconStyle.defaultProps = {
  options: {},
}

TheIconStyle.data = (options) => {
  const { dominantColor = ThemeValues.dominantColor } = options
  return asStyleData({
    '.the-icon': {
      display: 'inline-block',
      margin: '0 2px',
    },
  })
}

export default TheIconStyle
