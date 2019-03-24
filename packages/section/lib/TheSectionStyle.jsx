'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from 'the-component-util'
import { TheStyle } from 'the-style'

/** Style for TheSection */
const TheSectionStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-section-style', className)}
    styles={TheSectionStyle.data(options)}
  />
)

TheSectionStyle.displayName = 'TheSectionStyle'
TheSectionStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheSectionStyle.defaultProps = {
  options: {},
}

TheSectionStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    activeOpacity = ThemeValues.activeOpacity,
    backgroundColor = ThemeValues.backgroundColor,
    borderColor = ThemeValues.borderColor,
    hoverOpacity = ThemeValues.hoverOpacity,
    lightBorderColor = ThemeValues.lightBorderColor,
    tappableHeight = ThemeValues.tappableHeight,
  } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-section': {
        backgroundColor,
        display: 'block',
        fontWeight: 'normal',
        margin: '16px 0',
        position: 'relative',
      },
      '.the-section-body': {
        display: 'block',
        padding: '8px',
      },
      '.the-section-header': {
        '&.the-section-header-lined': {
          borderBottom: '1px solid #F0F0F0',
          color: '#999',
          fontSize: '14px',
          lineHeight: '16px',
          marginBottom: '4px',
          padding: '0 8px',
        },
        alignItems: 'center',
        borderBottom: borderColor,
        boxSizing: 'border-box',
        display: 'flex',
        fontWeight: 'normal',
        justifyContent: 'space-between',
        margin: 0,
        padding: '0 8px 8px',
        position: 'relative',
      },
      '.the-section-header-action': {
        flexGrow: 0,
        margin: 0,
        minHeight: '16px',
        padding: '2px 4px',
      },
      '.the-section-header-text': {
        display: 'block',
        width: '100%',
      },
    }),
    asStyleData({
      '.the-accordion-header-icon': {
        boxSizing: 'border-box',
        height: '1em',
        textAlign: 'center',
        transform: 'rotate(90deg)',
        transformOrigin: '50% 50%',
        transition: 'transform 100ms',
        width: '1em',
      },
      '.the-accordion-section': {
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'max-height 300ms',
      },
      '.the-accordion-section .the-section-body': {
        overflow: 'hidden',
      },
      '.the-accordion-section .the-section-header': {
        '&:active': { opacity: activeOpacity },
        '&:hover': { opacity: hoverOpacity },
        alignItems: 'center',
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '1em',
        height: tappableHeight + 2,
        lineHeight: `${tappableHeight}px`,
        margin: '-1px',
        padding: 0,
        position: 'relative',
        zIndex: 1,
      },
      '.the-accordion-section-inner': {},
      '.the-accordion-section.the-accordion-section-closed': {
        maxHeight: `${tappableHeight}px !important`,
      },
      '.the-accordion-section.the-accordion-section-open': {
        '.the-accordion-header-icon': {
          transform: 'rotate(180deg)',
        },
        '.the-section-body': {},
      },
    }),
  )
}

export default TheSectionStyle
