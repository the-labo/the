'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'

/** Style for TheContainer */
const TheContainerStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-container-style', className)}
    id={id}
    styles={TheContainerStyle.data(options)}
  />
)

TheContainerStyle.displayName = 'TheContainerStyle'
TheContainerStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheContainerStyle.defaultProps = {
  options: {},
}

TheContainerStyle.data = (options) => {
  const { containerWidth = ThemeValues.containerWidth } = options
  return {
    '.the-container': {
      margin: '0 auto',
      maxWidth: containerWidth,
    },
  }
}

export default TheContainerStyle
