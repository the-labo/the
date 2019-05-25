'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheForm */
const TheFormStyle = ({ className, id, options }) => (
  <TheStyle
    className={classnames('the-form-style', className)}
    id={id}
    styles={TheFormStyle.data(options)}
  />
)

TheFormStyle.displayName = 'TheFormStyle'
TheFormStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheFormStyle.defaultProps = {
  options: {},
}

TheFormStyle.data = (options) => {
  const {
    contentWidth = ThemeValues.contentWidth,
    errorColor = ThemeValues.errorColor,
    inlineHeight = ThemeValues.tappableHeight,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
  } = options
  return asStyleData({
    '.the-form': {
      margin: '0 auto',
      maxWidth: contentWidth,
      position: 'relative',
    },
    '.the-form-error-lead': {
      background: errorColor,
      borderRadius: '1px',
      color: 'white',
      display: 'block',
      fontSize: 'small',
      fontStyle: 'italic',
      margin: '4px 0',
      padding: '4px 8px',
    },
    '.the-form-field': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      margin: '8px 0',
      padding: '0 8px',
    },
    '.the-form-field-inline': {
      '&.the-form-label': {
        flexShrink: 0,
        marginRight: '8px',
      },
      flexWrap: 'nowrap',
      maxWidth: '100%',
    },
    '.the-form-field-set': {
      borderColor: lightBorderColor,
      borderStyle: 'solid',
      borderWidth: '1px 0 0',
      minWidth: 0,
    },
    '.the-form-label': {
      color: lightTextColor,
      fontSize: 'smaller',
      margin: '4px 0',
    },
    '.the-form-legend': {
      color: lightTextColor,
      fontSize: 'small',
    },
    '.the-form-spinner': {
      alignItems: 'center',
      backgroundColor: overlayBackgroundColor,
      bottom: 0,
      color: lightTextColor,
      display: 'flex',
      fontSize: '3em',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 4,
    },
    '.the-form-value': {
      '.the-input-text,.the-input-textarea,.the-input-password,.the-input-number,.the-input-date': {
        margin: 0,
      },
      width: '100%',
    },
    '.the-form.the-form-inline': {
      '.the-button': {
        borderRadius: '0 4px 4px 0',
        boxSizing: 'border-box',
        height: inlineHeight,
        marginLeft: '-1px',
        whiteSpace: 'nowrap',
      },
      '.the-input-error-message': {
        bottom: '100%',
        position: 'absolute',
      },
      '> *': {
        margin: '0',
      },
      alignItems: 'stretch',
      display: 'inline-flex',
      input: {
        borderRadius: '4px 0 0 4px ',
        height: inlineHeight,
      },
      margin: '0',
      padding: '0 8px',
      position: 'relative',
    },
  })
}

export default TheFormStyle
