'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import { TheIcon } from '@the-/ui-icon'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  readFileAsDataURL,
} from '@the-/util-ui'
import { get } from '@the-/window'
import TheCam from './TheCam'

const noop = () => null

/**
 * Embed camera component
 */
const TheCamInput = (props) => {
  const [busy, setBusy] = useState(false)
  const [media, setMedia] = useState(null)
  const [rejected, setRejected] = useState(false)
  const {
    audio,
    children,
    className,
    convertFile,
    height,
    name,
    onReject,
    onUpdate,
    readOnly,
    stream,
    style = {},
    uploadText = 'Upload',
    value,
    video,
    width,
  } = props

  const id = useMemo(() => newId() || props.id, [props.id])

  const handleReject = useCallback((e) => {
    setRejected(true)
    onReject && onReject(e)
  }, [])

  const handleClear = useCallback(async () => {
    onUpdate({ [name]: null })
  }, [name, onUpdate])

  const handleMedia = useCallback(
    async (media) => {
      setMedia(media)
    },
    [setMedia],
  )

  const handleShutter = useCallback(async () => {
    setBusy(true)
    try {
      const File = get('File', { strict: true })
      const blob = await media.takePhoto({})
      const filename = newId({ prefix: 'the-cam-input-value' })
      const file = await convertFile(
        new File([blob], filename, {
          type: blob.type,
        }),
      )
      onUpdate({ [name]: file })
    } finally {
      setBusy(false)
    }
  }, [setBusy, onUpdate, media, convertFile, name])

  const handleUploadChange = useCallback(
    async (e) => {
      setBusy(true)
      try {
        const {
          target: {
            files: [file],
          },
        } = e
        const converted = file ? await convertFile(file) : null
        onUpdate({ [name]: converted })
      } finally {
        setBusy(false)
      }
    },
    [onUpdate, setBusy, convertFile],
  )

  const hasValue = !!value
  return (
    <div
      {...htmlAttributesFor(props, {
        except: ['className', 'width', 'height', 'readOnly', 'value'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-cam-input', className, {
        'the-cam-input-rejected': rejected,
      })}
      data-name={name}
      id={id}
      style={{ ...style, height, width }}
    >
      {!rejected && (
        <TheCam
          audio={audio}
          disabled={hasValue}
          height={height}
          onMedia={handleMedia}
          onReject={handleReject}
          spinning={busy}
          stream={stream}
          video={video}
          width={width}
        >
          <input
            name={name}
            onChange={noop}
            type='hidden'
            value={value || ''}
          />
        </TheCam>
      )}
      {rejected && !hasValue && (
        <div
          className='the-cam-input-upload'
          style={readOnly ? {} : { height, width }}
        >
          <input
            accept='image/*'
            capture
            className='the-cam-input-upload-input'
            id={`${id}-file`}
            name={name}
            onChange={handleUploadChange}
            readOnly={readOnly}
            tabIndex={-1}
            type='file'
            value={value || ''}
          />
          <label className='the-cam-input-upload-label' htmlFor={`${id}-file`}>
            <i
              className={c(
                'the-cam-input-upload-icon',
                TheCamInput.UPLOAD_ICON,
              )}
            />
            <span className='the-camp-input-upload-text'>{uploadText}</span>
          </label>
        </div>
      )}
      {hasValue && (
        <TheCamInput.Preview
          handleClear={handleClear}
          height={height}
          value={value}
          width={width}
        />
      )}
      {!rejected && !hasValue && !busy && (
        <div className='the-cam-input-action'>
          <a className='the-cam-input-shutter' onClick={handleShutter} />
        </div>
      )}
      {children}
    </div>
  )
}

TheCamInput.Preview = function TheCamInputPreview({
  handleClear,
  height,
  value,
  width,
}) {
  return (
    <div className='the-cam-input-preview'>
      <img
        alt='captured image'
        className='the-cam-input-preview-img'
        src={value}
        style={{ height, width }}
      />
      <a className='the-cam-input-clear' onClick={handleClear}>
        <TheIcon className={TheCamInput.CLEAR_ICON} />
      </a>
    </div>
  )
}

TheCamInput.propTypes = {
  audio: TheCam.propTypes.audio,
  convertFile: PropTypes.func,
  height: TheCam.propTypes.height,
  onReject: PropTypes.func,
  onUpdate: PropTypes.func,
  video: TheCam.propTypes.video,
  width: TheCam.propTypes.width,
}

TheCamInput.defaultProps = {
  audio: TheCam.defaultProps.audio,
  convertFile: (file) => readFileAsDataURL(file),
  height: TheCam.defaultProps.height,
  onReject: null,
  onUpdate: null,
  value: null,
  video: TheCam.defaultProps.video,
  width: TheCam.defaultProps.width,
}

TheCamInput.UPLOAD_ICON = 'fas fa-cloud-upload-alt'
TheCamInput.CLEAR_ICON = 'fas fa-times'
TheCamInput.displayName = 'TheCamInput'

export default TheCamInput
