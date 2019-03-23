'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from 'the-style'

/** Style for TheContainer */
const TheContainerStyle = ({className, id, options}) => (
  <TheStyle {...{id}}
            className={c('the-container-style', className)}
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
  const {ThemeValues} = TheStyle
  const {
    containerWidth = ThemeValues.containerWidth,
  } = options
  return {
    '.the-container': {
      margin: '0 auto',
      maxWidth: containerWidth,
    },
  }
}

export default TheContainerStyle
