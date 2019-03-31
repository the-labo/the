'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'

/** Style for TheHtml */
const TheHtmlStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-html-style', className)}
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
  const {
    backgroundColor = ThemeValues.backgroundColor,
    fontFamily = ThemeValues.fontFamily,
    fontSize = ThemeValues.fontSize,
    height = '100%',
    textColor = ThemeValues.textColor,
  } = options
  return {
    '.the-html': {
      height,
    },
  }
}

export default TheHtmlStyle
