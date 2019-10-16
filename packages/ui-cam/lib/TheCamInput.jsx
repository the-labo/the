'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
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
class TheCamInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busy: false,
      rejected: false,
    }
    this.id = newId()
    this.handleShutter = this.handleShutter.bind(this)
    this.handleMedia = this.handleMedia.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
  }

  componentDidMount() {}

  componentDidUpdate(prevPros) {}

  componentWillUnmount() {}

  handleReject(e) {
    const {
      props: { onReject },
    } = this
    this.setState({
      rejected: true,
    })
    onReject && onReject(e)
  }

  render() {
    const {
      props,
      props: {
        audio,
        children,
        className,
        height,
        id = this.id,
        name,
        readOnly,
        style = {},
        uploadText = 'Upload',
        value,
        video,
        width,
      },
      state: { busy, rejected },
    } = this

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
            onMedia={this.handleMedia}
            onReject={this.handleReject}
            spinning={busy}
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
              onChange={this.handleUploadChange}
              readOnly={readOnly}
              tabIndex={-1}
              type='file'
              value={value || ''}
            />
            <label
              className='the-cam-input-upload-label'
              htmlFor={`${id}-file`}
            >
              <i
                className={c(
                  'the-cam-input-upload-icon',
                  TheCamInput.UPLOAD_ICON,
                )}
              />
              <span className={'the-camp-input-upload-text'}>{uploadText}</span>
            </label>
          </div>
        )}
        {hasValue && (
          <div className='the-cam-input-preview'>
            <img
              alt='captured image'
              className='the-cam-input-preview-img'
              src={value}
              style={{ height, width }}
            />
            <a className='the-cam-input-clear' onClick={this.handleClear}>
              <TheIcon className={TheCamInput.CLEAR_ICON} />
            </a>
          </div>
        )}
        {!rejected && !hasValue && !busy && (
          <div className='the-cam-input-action'>
            <a className='the-cam-input-shutter' onClick={this.handleShutter} />
          </div>
        )}
        {children}
      </div>
    )
  }

  async handleClear() {
    const {
      props: { name, onUpdate },
    } = this
    onUpdate({ [name]: null })
  }

  async handleMedia(media) {
    this.media = media
  }

  async handleShutter() {
    this.setState({ busy: true })
    try {
      const {
        media,
        props: { convertFile, name, onUpdate },
      } = this

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
      this.setState({ busy: false })
    }
  }

  async handleUploadChange(e) {
    const {
      props: { convertFile, name, onUpdate },
    } = this
    this.setState({ busy: true })
    try {
      const {
        target: {
          files: [file],
        },
      } = e
      const converted = file ? await convertFile(file) : null
      onUpdate({ [name]: converted })
    } finally {
      this.setState({ busy: false })
    }
  }
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
