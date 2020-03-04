'use strict'

import { asStyleData } from '@the-/util-ui'

function DropdownStyleData({
  activeOpacity,
  animationDuration,
  contentWidth,
  hoverOpacity,
  overlayBackgroundColor,
  overlayBorderColor,
  tappableHeight,
}) {
  return asStyleData({
    '.the-dropdown-menu': {
      '.the-menu': {
        margin: 0,
      },
      '.the-menu-item': {
        '&:hover': {
          '&:active': {
            background: '#F5F5F5',
          },
          background: '#FAFAFA',
        },
        marginBottom: '-1px',
        maxHeight: '0em',
        transition: `max-height ${animationDuration}ms`,
      },
      display: 'inline-block',
      maxWidth: contentWidth,
      position: 'relative',
    },
    '.the-dropdown-menu-button': {
      '.the-dropdown-menu-button-icon': {
        boxSizing: 'border-box',
        height: '1em',
        textAlign: 'center',
        transform: 'rotate(-180deg)',
        transformOrigin: '50% 50%',
        transition: 'transform 100ms',
        width: '1em',
      },
      '.the-dropdown-menu-button-text': {
        width: '100%',
      },
      '.the-menu-item-text': {
        overflow: 'hidden',
        textOverflow: 'ellipses',
        whiteSpace: 'nowrap',
      },
      '&:active': { opacity: activeOpacity },
      '&:hover': { opacity: hoverOpacity },
      alignItems: 'center',
      borderColor: '#AAA',
      cursor: 'pointer',
      display: 'flex',
      minHeight: '36px',
      padding: '0 4px',
    },
    '.the-dropdown-menu-inner': {
      backgroundColor: overlayBackgroundColor,
      border: '1px solid transparent',
      boxShadow: '0px 0px 0px rgba(0,0,0,0.33)',
      maxWidth: '100vw',
      minWidth: tappableHeight * 3,
      opacity: 0,
      overflow: 'auto',
      position: 'absolute',
      transition: `opacity ${animationDuration}ms, box-shadow ${animationDuration}ms, border-color ${animationDuration}ms`,
      ul: {
        overflow: 'hidden',
      },
      width: 'max-content',
      zIndex: 8,
    },
    '.the-dropdown-menu.the-dropdown-menu-open': {
      '.the-dropdown-menu-button-icon': {
        transform: 'rotate(0deg)',
      },
      '.the-dropdown-menu-inner': {
        borderColor: overlayBorderColor,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        opacity: 1,
      },
      '.the-menu-item': {
        margin: 0,
        maxHeight: '3em',
      },
    },
    '.the-dropdown-menu.the-dropdown-menu-righted': {
      '.the-dropdown-menu-inner': {
        left: 'auto',
        right: '0',
      },
    },
  })
}

export default DropdownStyleData
