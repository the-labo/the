'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheChart */
const TheChartStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-chart-style', className)}
    id={id}
    styles={TheChartStyle.data(options)}
  />
)

TheChartStyle.displayName = 'TheChartStyle'
TheChartStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheChartStyle.defaultProps = {
  options: {},
}

TheChartStyle.data = () =>
  asStyleData('.the-chart', {
    '.the-chart-canvas': {},
    '&': {},
  })

export default TheChartStyle
