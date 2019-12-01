'use strict'

import c from 'classnames'
import React, { useCallback } from 'react'
import { TheIcon } from '@the-/ui-icon'
import { isImageUrl, isVideoUrl } from '../helpers'

export default React.memo(function TheInputUploadPreview({
  height,
  i,
  url,
  width,
}) {
  const Content = useCallback(({ height, url, width }) => {
    if (isVideoUrl(url)) {
      return (
        <video
          className={c('the-input-upload-preview-video')}
          height={height}
          preload='metadata'
          src={url}
          width={width}
        />
      )
    }

    if (isImageUrl(url)) {
      return (
        <img
          className={c('the-input-upload-preview-img')}
          height={height}
          src={url}
          width={width}
        />
      )
    }

    return (
      <span className={c('the-input-upload-unknown')}>
        <TheIcon className='fas fa-file' />
      </span>
    )
  }, [])
  return (
    <div
      className={c('the-input-upload-preview')}
      key={url}
      style={{
        height,
        left: `${i * 10}%`,
        top: `${i * 10}%`,
        width,
      }}
    >
      <Content height={height} url={url} width={width} />
    </div>
  )
})
