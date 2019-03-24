'use strict'

import { asStyleData } from '@the-/util-component'

function SearchStyleData({
  ToggleIconStyle,
  animationDuration,
  contentWidth,
  dominantColor,
}) {
  return asStyleData({
    '.the-input-search': {
      maxWidth: '2em',
      position: 'relative',
      transition: `max-width ${animationDuration}ms`,
    },
    '.the-input-search .the-input-text-input': {
      opacity: 0,
      transition: `opacity ${animationDuration}ms`,
    },
    '.the-input-search-toggle': ToggleIconStyle({
      color: dominantColor,
      outline: 'none',
      padding: '0 8px',
      transition: `opacity ${animationDuration}ms`,
    }),
    '.the-input-search.the-input-search-open': {
      '.the-input-search-toggle': {
        padding: '0 4px',
      },
      '.the-input-text-input': {
        opacity: 1,
      },
      maxWidth: contentWidth,
    },
  })
}

export default SearchStyleData
