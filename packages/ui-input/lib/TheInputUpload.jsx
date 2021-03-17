'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheSpin } from '@the-/ui-spin'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  readFileAsDataURL,
} from '@the-/util-ui'
import { renderErrorMessage } from './helpers'
import TheInputUploadCloseButton from './partials/TheInputUploadCloseButton'
import TheInputUploadLabel from './partials/TheInputUploadLabel'
import TheInputUploadPreview from './partials/TheInputUploadPreview'

const TheInputUpload = React.memo((props) => {
  const {
    accept,
    children,
    className,
    closeIcon,
    convertFile,
    guideIcon,
    height,
    multiple,
    name,
    onChange,
    onError,
    onLoad,
    onUpdate,
    readOnly,
    text,
    value,
    width,
  } = props
  const id = useMemo(() => props.id || newId(), [props.id])
  const [error, setError] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [urls, setUrls] = useState([].concat(props.value).filter(Boolean))
  const [gone, setGone] = useState(null)
  useEffect(
    () => () => {
      setGone(true)
    },
    [],
  )

  useEffect(() => {
    const hasValue = value && value.length > 0
    if (hasValue) {
      setUrls([].concat(value))
    }
  }, [value])

  const filesToUrls = useCallback(
    async (files) =>
      Promise.all(
        [...files].map(async (file) =>
          convertFile(file, {
            multiple,
            name,
            value,
          }),
        ),
      ),
    [convertFile, multiple, name, value],
  )

  const handleError = useCallback(
    (error) => {
      setError(error)
      if (onError) {
        onError(error)
      } else {
        console.error('[TheInputUpload] File change failed', error)
      }
    },
    [setError],
  )

  const spinWhile = useCallback(
    async (action) => {
      setSpinning(true)
      try {
        return await action()
      } finally {
        setSpinning(false)
      }
    },
    [setSpinning],
  )

  const handleChange = useCallback(
    (e) => {
      const { target } = e
      if (target.files.length === 0) {
        return
      }

      onChange && onChange(e)
      void spinWhile(async () => {
        try {
          const urls = await filesToUrls(target.files)
          if (gone) {
            return
          }

          onLoad && onLoad({ target, urls })
          onUpdate && onUpdate({ [name]: multiple ? urls : urls[0] })
          setUrls(urls)
          setError(null)
        } catch (error) {
          setUrls([])
          handleError(error)
        }
      })
    },
    [multiple, name, onChange, onError, onLoad, onUpdate, gone],
  )

  const handleRemove = useCallback(() => {
    const urls = []
    setError(null)
    setUrls(urls)
    onLoad && onLoad(urls)
    onUpdate && onUpdate({ [name]: null })
  }, [name, onLoad, onUpdate])

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
        onChange={handleChange}
        readOnly={readOnly}
        style={readOnly && !hasImage ? {} : { height, width }}
        tabIndex={-1}
        type='file'
      />
      <TheCondition unless={readOnly}>
        <TheInputUploadLabel
          htmlFor={`${id}-file`}
          icon={guideIcon || TheInputUpload.GUIDE_ICON}
          text={text}
        >
          {children}
        </TheInputUploadLabel>
      </TheCondition>
      <TheCondition if={spinning}>
        <TheSpin className='the-input-upload-spin' cover enabled />
      </TheCondition>
      <TheCondition if={hasImage}>
        <div>
          <TheCondition unless={readOnly}>
            <TheInputUploadCloseButton
              icon={closeIcon || TheInputUpload.CLOSE_ICON}
              onClick={handleRemove}
            />
          </TheCondition>
          {(urls || []).filter(Boolean).map((url, i) => (
            <TheInputUploadPreview
              height={height}
              i={i}
              key={url}
              url={url}
              width={width}
            />
          ))}
        </div>
      </TheCondition>
    </div>
  )
})

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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
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
