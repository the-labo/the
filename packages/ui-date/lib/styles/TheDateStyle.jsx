'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheInput */
const TheDateStyle = ({ className, id, options }) => [
  <TheStyle
    className={c('the-date-style', className)}
    id={id}
    key='base'
    styles={TheDateStyle.data(options)}
  />,
  ...TheDateStyle.externals.map((src) => (
    <link
      className={c('the-date-style-external')}
      href={src}
      key={src}
      rel='stylesheet'
    />
  )),
]

TheDateStyle.displayName = 'TheDateStyle'
TheDateStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheDateStyle.defaultProps = {
  options: {},
}

TheDateStyle.externals = [
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
]
TheDateStyle.data = (options) => {
  const {
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
    errorColor = ThemeValues.errorColor,
    inputBorderColor = ThemeValues.inputBorderColor,
    inputShadowColor = ThemeValues.inputShadowColor,
  } = options

  return Object.assign(
    {},
    asStyleData({
      '.the-date': {},
    }),
    asStyleData({
      '.the-date-date': {
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '0 4px',
        maxWidth: contentWidth,
        position: 'relative',
        verticalAlign: 'middle',
      },
      '.the-date-date-input': {
        border: `1px solid ${inputBorderColor}`,
        borderRadius: '2px',
        boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
        boxSizing: 'border-box',
        display: 'block',
        lineHeight: '20px',
        maxWidth: '100%',
        minHeight: '28px',
        outlineColor: dominantColor,
        padding: '4px 8px',
        width: 'auto',
      },
    }),
    asStyleData({
      '.the-date-message': {
        display: 'block',
        fontSize: 'small',
        fontStyle: 'italic',
        margin: '0 0 -2px',
        maxHeight: '2em',
        overflow: 'hidden',
        padding: '4px 4px 0',
        transition: 'max-height 300ms',
      },
      '.the-date-message.the-date-message-empty': {
        margin: 0,
        maxHeight: '0em',
        padding: 0,
      },
    }),
    asStyleData('.the-date-error', {
      '.the-date-error-message': {
        color: errorColor,
      },
      '.the-date-select-display': {
        borderColor: errorColor,
      },
      '.the-date-text-input,.the-date-textarea-input,.the-date-date-input': {
        borderColor: errorColor,
      },
      '&.the-date-radio,&.the-date-checkbox': {
        border: `1px solid ${errorColor}`,
      },
    }),
  )
}

export default TheDateStyle
