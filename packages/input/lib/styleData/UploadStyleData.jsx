/**
 * @function TheInputUploadStyleData
 */
'use strict'

import { asStyleData } from '@the-/util-component'

/** @lends UploadStyleData */
function UploadStyleData({ backgroundColor, errorColor }) {
  return asStyleData({
    '.the-input-upload': {
      '&:active': {
        color: '#777',
        opacity: 1,
        textShadow: 'none',
      },
      '&:hover': {
        color: '#555',
      },
      color: '#888',
      display: 'inline-block',
      overflow: 'hidden',
      position: 'relative',
    },
    '.the-input-upload .the-input-error-message': {
      background: 'rgba(255,255,255,0.5)',
      position: 'relative',
      zIndex: 44,
    },
    '.the-input-upload-aligner': {
      boxSizing: 'border-box',
      display: 'inline-block',
      height: '100%',
      marginRight: '-1px',
      verticalAlign: 'middle',
      width: '1px',
    },
    '.the-input-upload-close': {
      '&:active': {
        boxShadow: 'none',
        color: '#555',
        opacity: 1,
      },
      '&:hover': {
        boxShadow: 'none',
        color: '#555',
        opacity: 1,
      },
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: 0,
      color: '#AAA',
      display: 'inline-block',
      fontSize: '24px',
      margin: 0,
      padding: '8px',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 5,
    },
    '.the-input-upload-icon': {
      display: 'block',
      fontSize: '2em',
    },
    '.the-input-upload-input': {
      cursor: 'pointer',
      display: 'inline-block',
      opacity: 0,
      position: 'relative',
      zIndex: 2,
    },
    '.the-input-upload-label': {
      backgroundColor: `${backgroundColor}`,
      border: '1px solid #CCC',
      borderRadius: '2px',
      bottom: 0,
      boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.33)',
      boxSizing: 'border-box',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      textAlign: 'center',
      top: 0,
      zIndex: 1,
    },
    '.the-input-upload-label-inner': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    '.the-input-upload-preview': {
      border: '1px solid #AAA',
      bottom: 0,
      boxSizing: 'border-box',
      display: 'inline-block',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 4,
    },
    '.the-input-upload-preview-img': {
      objectFit: 'contain',
    },
    '.the-input-upload-preview-video': {
      objectFit: 'contain',
    },
    '.the-input-upload-spin.the-spin.the-spinner-cover': {
      zIndex: 8,
    },
    '.the-input-upload-text': {},
    '.the-input-upload.the-input-error': {
      '.the-input-upload-label': {
        borderColor: errorColor,
      },
    },
    '.the-input-upload.the-input-upload-read-only': {
      '.the-input-upload-input': {
        pointerEvents: 'none',
      },
    },
  })
}

export default UploadStyleData
