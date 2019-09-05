'use strict'

import { asStyleData } from '@the-/util-ui'

function CamInputStyleData({ dominantColor, tappableHeight }) {
  const tappableSize = tappableHeight
  return asStyleData({
    '.the-cam-input': {
      position: 'relative',
    },
    '.the-cam-input-action': {
      alignItems: 'center',
      background: 'transparent',
      bottom: 0,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      padding: '8px',
      position: 'absolute',
      right: 0,
      width: '100%',
    },
    '.the-cam-input-clear': {
      alignItems: 'center',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '2px',
      boxSizing: 'border-box',
      color: '#888',
      display: 'inline-flex',
      height: tappableSize,
      justifyContent: 'center',
      padding: '8px',
      position: 'absolute',
      right: '0px',
      top: '0px',
      width: tappableSize,
    },
    '.the-cam-input-preview': {
      alignItems: 'center',
      background: '#F0F0F0',
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '.the-cam-input-preview-img': {
      boxShadow: '0 0 4px rgba(0,0,0,0.33)',
      height: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      width: '100%',
    },
    '.the-cam-input-shutter': {
      '&:active': {
        boxShadow: 'none',
      },
      background: '#FFF',
      border: '4px solid #CCC',
      borderRadius: '50%',
      boxShadow: '1px 1px 2px rgba(0,0,0,0.33)',
      boxSizing: 'border-box',
      cursor: 'pointer',
      height: tappableSize,
      margin: '2px auto',
      width: tappableSize,
    },
    '.the-cam-input-upload': {
      display: 'block',
      height: '64px',
      margin: '16px auto',
      position: 'relative',
      textAlign: 'center',
      width: '64px',
    },
    '.the-cam-input-upload-icon': {
      '&:active': {
        boxShadow: '1px 1px 2px rgba(0,0,0,0.33) inset',
      },
      '&:hover': {
        background: '#F8F8F8',
      },
      alignItems: 'center',
      background: 'white',
      border: '1px solid',
      borderRadius: '50%',
      color: dominantColor,
      cursor: 'pointer',
      display: 'inline-flex',
      fontSize: '44px',
      height: '64px',
      justifyContent: 'center',
      padding: '16px',
      width: '64px',
    },
    '.the-cam-input-upload-input': {
      cursor: 'pointer',
      display: 'inline-block',
      opacity: 0,
      position: 'relative',
      zIndex: 2,
    },
    '.the-cam-input-upload-label': {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
  })
}

export default CamInputStyleData
