'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'
import CheckBoxStyleData from './data/CheckBoxStyleData'
import NumberStyleData from './data/NumberStyleData'
import PasswordStyleData from './data/PasswordStyleData'
import PinCodeStyleData from './data/PinCodeStyleData'
import RadioStyleData from './data/RadioStyleData'
import SearchStyleData from './data/SearchStyleData'
import SelectStyleData from './data/SelectStyleData'
import TagStyleData from './data/TagStyleData'
import TextareaStyleData from './data/TextareaStyleData'
import TextStyleData from './data/TextStyleData'
import ToggleStyleData from './data/ToggleStyleData'
import UploadStyleData from './data/UploadStyleData'

/** Style for TheInput */
const TheInputStyle = ({ className, id, options }) => [
  <TheStyle
    className={c('the-input-style', className)}
    id={id}
    key='base'
    styles={TheInputStyle.data(options)}
  />,
  ...TheInputStyle.externals.map((src) => (
    <link
      className={c('the-input-style-external')}
      href={src}
      key={src}
      rel='stylesheet'
    />
  )),
]

TheInputStyle.displayName = 'TheInputStyle'
TheInputStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheInputStyle.defaultProps = {
  options: {},
}

TheInputStyle.externals = []
TheInputStyle.data = (options) => {
  const {
    activeOpacity = ThemeValues.activeOpacity,
    animationDuration = 400,
    backgroundColor = ThemeValues.backgroundColor,
    contentPadding = ThemeValues.contentPadding,
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
    errorColor = ThemeValues.errorColor,
    hoverOpacity = ThemeValues.hoverOpacity,
    inputBorderColor = ThemeValues.inputBorderColor,
    inputShadowColor = ThemeValues.inputShadowColor,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
    offLabelBackgroundColor = '#FAFAFA',
    tappableHeight = ThemeValues.tappableHeight,
    toggleHandleSize = 24,
    warnColor = ThemeValues.warnColor,
  } = options

  const ToggleIconStyle = (values) =>
    Object.assign(
      {
        '&:active': { opacity: activeOpacity },
        '&:hover': { opacity: hoverOpacity },
        alignItems: 'center',
        bottom: 0,
        cursor: 'pointer',
        display: 'inline-flex',
        height: '30px',
        justifyContent: 'center',
        minWidth: '1em',
        outlineColor: dominantColor,
        padding: '0 4px',
        position: 'absolute',
        right: 0,
        zIndex: 4,
      },
      values,
    )

  // TODO ./data下にファイルを分割する
  return Object.assign(
    {},
    asStyleData({
      '.the-input': {},
    }),
    asStyleData({
      '.the-input-message': {
        display: 'block',
        fontSize: 'small',
        fontStyle: 'italic',
        margin: '0 0 -2px',
        maxHeight: '2em',
        overflow: 'hidden',
        padding: '4px 4px 0',
        transition: 'max-height 300ms',
      },
      '.the-input-message.the-input-message-empty': {
        margin: 0,
        maxHeight: '0em',
        padding: 0,
      },
    }),
    TextStyleData({
      backgroundColor,
      contentPadding,
      contentWidth,
      dominantColor,
      inputBorderColor,
      inputShadowColor,
      lightBorderColor,
      tappableHeight,
    }),
    PasswordStyleData({
      ToggleIconStyle,
    }),
    SearchStyleData({
      ToggleIconStyle,
      animationDuration,
      contentWidth,
      dominantColor,
    }),
    TextareaStyleData({
      contentWidth,
      dominantColor,
      inputBorderColor,
      inputShadowColor,
    }),
    RadioStyleData({
      activeOpacity,
      backgroundColor,
      contentWidth,
      dominantColor,
      hoverOpacity,
      tappableHeight,
    }),
    CheckBoxStyleData({
      activeOpacity,
      backgroundColor,
      contentWidth,
      dominantColor,
      hoverOpacity,
      tappableHeight,
    }),
    ToggleStyleData({
      animationDuration,
      backgroundColor,
      dominantColor,
      inputBorderColor,
      offLabelBackgroundColor,
      toggleHandleSize,
    }),
    SelectStyleData({
      backgroundColor,
      contentPadding,
      contentWidth,
      dominantColor,
      inputBorderColor,
      lightBorderColor,
      lightTextColor,
      tappableHeight,
    }),
    asStyleData('.the-input-warn', {
      '.the-input-select-display': {
        borderColor: warnColor,
      },
      '.the-input-text-input,.the-input-textarea-input,.the-input-date-input': {
        borderColor: warnColor,
      },
      '.the-input-warn-message': {
        color: warnColor,
      },
      '&.the-input-radio,&.the-input-checkbox': {
        border: `1px solid ${warnColor}`,
      },
    }),
    asStyleData('.the-input-error', {
      '.the-input-error-message': {
        color: errorColor,
      },
      '.the-input-select-display': {
        borderColor: errorColor,
      },
      '.the-input-text-input,.the-input-textarea-input,.the-input-date-input': {
        borderColor: errorColor,
      },
      '&.the-input-radio,&.the-input-checkbox': {
        border: `1px solid ${errorColor}`,
      },
    }),
    NumberStyleData({
      dominantColor,
    }),
    UploadStyleData({
      backgroundColor,
      errorColor,
    }),
    TagStyleData({
      backgroundColor,
      dominantColor,
      inputBorderColor,
      inputShadowColor,
    }),
    PinCodeStyleData({
      contentWidth,
      dominantColor,
    }),
  )
}

export default TheInputStyle
