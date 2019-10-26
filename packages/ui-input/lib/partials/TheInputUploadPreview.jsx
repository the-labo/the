'use strict'

import c from 'classnames'
import React from 'react'
import { isVideoUrl } from '../helpers'

export default React.memo(function TheInputUploadPreview({
  height,
  i,
  url,
  width,
}) {
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
      {isVideoUrl(url) ? (
        <video
          className={c('the-input-upload-preview-video')}
          height={height}
          preload='metadata'
          src={url}
          width={width}
        />
      ) : (
        <img
          className={c('the-input-upload-preview-img')}
          height={height}
          src={url}
          width={width}
        />
      )}
    </div>
  )
})
