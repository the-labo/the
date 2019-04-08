'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheFlick */
const TheFlickStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-flick-style', className)}
    styles={TheFlickStyle.data(options)}
  />
)

TheFlickStyle.displayName = 'TheFlickStyle'
TheFlickStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheFlickStyle.defaultProps = {
  options: {},
}

TheFlickStyle.data = (options) => {
  const { minMediaSize = 92 } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-flick': {
        backgroundColor: 'transparent',
        bottom: 0,
        display: 'none',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 99,
      },
      '.the-flick-back': {
        backgroundColor: 'rgba(0,0,0,0.66)',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
      '.the-flick-back-inner': {
        boxSizing: 'border-box',
        display: 'block',
        height: '100%',
        width: '100%',
      },
      '.the-flick-body': {
        boxSizing: 'border-box',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'height 300ms',
        width: '100%',
      },
      '.the-flick-close-button': {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: '16px',
        justifyContent: 'center',
        lineHeight: `16px`,
        padding: '16px',
        zIndex: 44,
      },
      '.the-flick-content': {
        background: 'rgba(44, 44, 44, 0.9)',
        border: '1px solid #111',
        borderRadius: '4px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        boxSizing: 'border-box',
        color: '#AAA',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        zIndex: 4,
      },
      '.the-flick-fix': {
        overflow: 'hidden !important',
      },
      '.the-flick-flip-button': {
        '&:active': {
          color: '#888',
        },
        backgroundColor: 'transparent',
        borderColor: '#AAA',
        borderRadius: '4px',
        color: '#AAA',
        height: '128px',
        minWidth: '21px',
        padding: 0,
      },
      '.the-flick-flip-button-wrap': {
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'visible',
        position: 'absolute',
        top: 0,
        width: '1px',
        zIndex: 5,
      },
      '.the-flick-footer': {
        height: '44px',
      },
      '.the-flick-header': {
        alignItems: 'center',
        display: 'flex',
        height: '44px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      },
      '.the-flick-header-row': {
        '&:nth-child(1)': {
          textAlign: 'left',
        },
        '&:nth-child(2)': {
          width: '100%',
        },
        '&:nth-child(3)': {
          textAlign: 'right',
        },
        width: '48px',
      },
      '.the-flick-header-title': {
        display: 'block',
        lineHeight: '48px',
        margin: '0',
        textAlign: 'center',
        width: '100%',
      },
      '.the-flick-image': {
        '.the-image': {
          background: 'transparent',
          height: 'fit-content !important',
          minHeight: minMediaSize,
          minWidth: minMediaSize,
        },
        '.the-image-img': {
          height: 'auto !important',
          width: 'auto !important',
        },
        '.the-image-inner': {
          height: '100%',
        },
        '.the-image-spin': {
          color: '#888',
          fontSize: '44px',
        },
        '.the-video': {
          background: 'transparent',
          display: 'block',
          minHeight: minMediaSize,
          minWidth: minMediaSize,
          overflow: 'auto', // TODO remove
        },
        '.the-video-inner': {
          height: 'auto',
          maxHeight: '100%',
        },
        '.the-video-spin': {
          color: '#888',
          fontSize: '44px',
        },
        '.the-video-video': {},
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: '4px 32px',
        width: '100%',
      },
      '.the-flick-image-body-inner': {
        '&.react-draggable-dragging': {
          transition: 'none',
        },
        '&.the-flick-image-body-inner-animating': {
          transition: 'transform 300ms',
        },
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        display: 'flex',
        height: '100%',
        position: 'relative',
      },
      '.the-flick-image-description': {
        boxSizing: 'border-box',
        fontSize: 'smaller',
        margin: '0',
        position: 'relative',
        textAlign: 'center',
        width: '100%',
        zIndex: 2,
      },
      '.the-flick-image-info': {
        display: 'block',
        flexShrink: 0,
        width: '100%',
      },
      '.the-flick-image-inner': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        transformOrigin: '50% 50%',
        transition: 'transform 150ms',
        width: '100%',
      },
      '.the-flick-image-title': {
        boxSizing: 'border-box',
        color: '#CCC',
        display: 'block',
        fontSize: '1.33em',
        fontWeight: 'normal',
        margin: '4px 0',
        position: 'relative',
        textAlign: 'center',
        width: '100%',
        zIndex: 2,
      },
      '.the-flick-image-wrap': {
        height: '100%',
        width: '100%',
      },
      '.the-flick-image-wrap-active': {},
      '.the-flick-inner': {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: '24px 24px',
        position: 'relative',
        width: '100%',
        zIndex: 4,
      },
      '.the-flick.the-flick-present': {
        display: 'block',
      },
    }),
  )
}

export default TheFlickStyle
