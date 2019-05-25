'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'

/** Style for TheHtml */
const TheHtmlStyle = ({ className, id, options }) => (
  <TheStyle
    className={classnames('the-html-style', className)}
    id={id}
    styles={TheHtmlStyle.data(options)}
  />
)

TheHtmlStyle.displayName = 'TheHtmlStyle'
TheHtmlStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheHtmlStyle.defaultProps = {
  options: {},
}

TheHtmlStyle.data = (options) => {
  const { height = '100%' } = options
  return {
    '.the-html': {
      height,
    },
  }
}

export default TheHtmlStyle
