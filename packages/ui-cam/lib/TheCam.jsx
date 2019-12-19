'use strict'

import asleep from 'asleep'
import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TheMedia } from '@the-/media'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Embed camera component
 */
const TheCam = (props) => {
  const videoRef = useRef(props.videoRef)

  const {
    audio,
    children,
    className,
    disabled,
    height,
    onMedia,
    onReady,
    onReject,
    onStart,
    onStop,
    onStream,
    onVideo,
    rejectedMessage,
    spinning,
    video,
    width,
    stream,
  } = props
  const media = useMemo(() => new TheMedia({ stream, audio, video }), [])

  const start = useCallback(async () => {
    setBusy(true)
    await asleep(0)
    try {
      await media.start()
    } catch (e) {
      setBusy(false)
      setRejected(true)
      setRunning(false)
      if (onReject) {
        onReject(e)
      } else {
        console.error('[TheCam] Failed to start media', e)
      }

      return
    }
    const { current: video } = videoRef
    if (video) {
      await media.bindVideo(video, {})
      setBusy(false)
      setRejected(false)
      setRunning(true)
    }

    // Call backs
    {
      const { stream } = media
      onStream && onStream(stream)
      onStart && onStart({ media, stream, video })
    }
  }, [media, onStart, onStream])

  const stop = useCallback(async () => {
    const { current: video } = videoRef
    if (video) {
      video.srcObject = null
      setBusy(false)
      setRejected(false)
      setRunning(false)
    }

    try {
      await media.stop()
    } catch (e) {
      // Do nothing
    }
    // Callbacks
    onStop && onStop({ media, stream: media.stream, video })
  }, [onStop, media.stream, videoRef.current])

  useEffect(async () => {
    await media.updateConstrains({ audio, video })
  }, [audio, video])

  const [busy, setBusy] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (disabled) {
      void stop()
    } else {
      void start()
    }
  }, [disabled])
  useEffect(() => {
    onVideo && onVideo(videoRef.current)
  }, [videoRef.current])
  useEffect(() => {
    media && onMedia && onMedia(media)
  }, [media])
  useEffect(() => {
    if (running) {
      void stop()
    }
  }, [])
  const handleVideoLoad = useCallback(() => {
    onReady && onReady()
  }, [onReady])
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-cam', className)}
    >
      <div className='the-cam-inner' style={{ height, width }}>
        {(busy || spinning) && (
          <TheSpin className='the-cam-spin' cover enabled size='x-large' />
        )}
        {rejected ? (
          <div className='the-cam-rejected'>{rejectedMessage}</div>
        ) : (
          <>
            <video
              autoPlay
              className='the-cam-video'
              onLoadedData={handleVideoLoad}
              playsInline
              ref={videoRef}
            />
            {children}
          </>
        )}
      </div>
    </div>
  )
}

TheCam.propTypes = {
  /** Audio media constraint */
  audio: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  /** Camera disabled */
  disabled: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Handle for stream */
  onStream: PropTypes.func,
  /** Message to show when camera access rejected */
  rejectedMessage: PropTypes.node,
  /** Video media constraint */
  video: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheCam.defaultProps = {
  audio: false,
  disabled: false,
  height: 150,
  onReject: null,
  onStream: null,
  rejectedMessage: 'Failed to access camera',
  spinning: false,
  video: true,
  width: '100%',
}

TheCam.displayName = 'TheCam'

export default TheCam
