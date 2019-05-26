'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheIcon } from '@the-/ui-icon'
import { TheSpin } from '@the-/ui-spin'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  readFileAsDataURL,
} from '@the-/util-ui'
import {
  isImageUrl,
  isUnknownTypeUrl,
  isVideoUrl,
  renderErrorMessage,
} from './helpers'

const previewUrlFilter = (url) =>
  isImageUrl(url) || isVideoUrl(url) || isUnknownTypeUrl(url)

class TheInputUpload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.id = newId()
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      error: null,
      spinning: false,
      urls: [].concat(props.value).filter(Boolean),
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const {
      props: { value },
    } = this

    const hasValue = value && value.length > 0
    if (hasValue && prevProps.value !== value) {
      this.setState({ urls: [].concat(value) })
    }
  }

  componentWillUnmount() {
    this.gone = true
  }

  handleChange(e) {
    const {
      props,
      props: {
        convertFile,
        multiple,
        name,
        onChange,
        onError,
        onLoad,
        onUpdate,
      },
    } = this
    const { target } = e

    if (target.files.length === 0) {
      return
    }
    this.setState({ spinning: true })
    onChange && onChange(e)
    ;(async () => {
      try {
        const urls = await Promise.all(
          [...target.files].map(async (file) => convertFile(file, props)),
        )
        if (this.gone) {
          return
        }
        onLoad && onLoad({ target, urls })
        onUpdate && onUpdate({ [name]: multiple ? urls : urls[0] })
        this.setState({ urls })
      } catch (error) {
        this.setState({ error, spinning: false, urls: [] })
        if (onError) {
          onError(error)
        } else {
          console.error('[TheInputUpload] File change failed', error)
        }
      } finally {
        this.setState({ spinning: false })
      }
    })()
  }

  handleRemove() {
    const {
      props: { name, onLoad, onUpdate },
    } = this

    const urls = []
    this.setState({
      error: null,
      urls,
    })
    onLoad && onLoad(urls)
    onUpdate && onUpdate({ [name]: null })
  }

  render() {
    const {
      props,
      props: {
        accept,
        children,
        className,
        closeIcon,
        error,
        guideIcon,
        height,
        id = this.id,
        multiple,
        name,
        readOnly,
        text,
        value,
        width,
      },
      state: { spinning, urls },
    } = this

    const hasImage = !!urls && urls.length > 0
    return (
      <div
        {...htmlAttributesFor(props, { except: ['id', 'className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-input-upload', className, {
          'the-input-error': !!error,
          'the-input-upload-read-only': !!readOnly,
        })}
        data-value={value}
        id={id}
      >
        {renderErrorMessage(error)}
        <input
          accept={accept}
          className={c('the-input-upload-input')}
          id={`${id}-file`}
          multiple={multiple}
          name={name}
          onChange={this.handleChange}
          readOnly={readOnly}
          style={readOnly && !hasImage ? {} : { height, width }}
          tabIndex={-1}
          type='file'
        />
        <TheCondition unless={readOnly}>
          <label className='the-input-upload-label' htmlFor={`${id}-file`}>
            <span className='the-input-upload-aligner' />
            <span className='the-input-upload-label-inner'>
              <i
                className={c(
                  'the-input-upload-icon',
                  guideIcon || TheInputUpload.GUIDE_ICON,
                )}
              />
              <span className='the-input-upload-text'>{text}</span>
              {children}
            </span>
          </label>
        </TheCondition>
        <TheCondition if={spinning}>
          <TheSpin className='the-input-upload-spin' cover enabled />
        </TheCondition>
        <TheCondition if={hasImage}>
          <div>
            <TheCondition unless={readOnly}>
              <a className='the-input-upload-close' onClick={this.handleRemove}>
                <TheIcon
                  className={c(
                    'the-input-upload-close-icon',
                    closeIcon || TheInputUpload.CLOSE_ICON,
                  )}
                />
              </a>
            </TheCondition>
            {(urls || [])
              .filter(Boolean)
              .filter(previewUrlFilter)
              .map((url, i) => (
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
              ))}
          </div>
        </TheCondition>
      </div>
    )
  }
}

TheInputUpload.GUIDE_ICON = 'fas fa-cloud-upload-alt'
TheInputUpload.CLOSE_ICON = 'fas fa-times'

TheInputUpload.propTypes = {
  /** Name of input */
  /** Accept file type */
  accept: PropTypes.string,
  /** Convert input file */
  convertFile: PropTypes.func,
  /** Error message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Image height */
  height: PropTypes.number,
  /** Allow multiple upload */
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  /** Handler for error event */
  onError: PropTypes.func,
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Spinner theme */
  spinner: PropTypes.string,
  /** Guide text */
  text: PropTypes.string,
  /** Value of input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Image width */
  width: PropTypes.number,
}

TheInputUpload.defaultProps = {
  accept: null,
  convertFile: (file) => readFileAsDataURL(file),
  error: null,
  height: 180,
  multiple: false,
  readOnly: false,
  text: 'Upload File',
  width: 180,
}

TheInputUpload.displayName = 'TheInputUpload'

export default TheInputUpload
