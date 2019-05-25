'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheCondition */
const TheConditionStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-condition-style', className)}
    id={id}
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

TheConditionStyle.data = () =>
  asStyleData('.the-condition', {
    '&': {},
  })

export default TheConditionStyle
