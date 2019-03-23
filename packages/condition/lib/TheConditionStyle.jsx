'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from 'the-component-util'
import { TheStyle } from 'the-style'

/** Style for TheCondition */
const TheConditionStyle = ({className, id, options}) => (
  <TheStyle {...{id}}
            className={c('the-condition-style', className)}
            styles={TheConditionStyle.data(options)}
  />
)

TheConditionStyle.displayName = 'TheConditionStyle'
TheConditionStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheConditionStyle.defaultProps = {
  options: {},
}

TheConditionStyle.data = (options) => {
  const {ThemeValues} = TheStyle
  const {
    dominantColor = ThemeValues.dominantColor,
  } = options
  return asStyleData('.the-condition', {
    '&': {},
  })
}

export default TheConditionStyle
