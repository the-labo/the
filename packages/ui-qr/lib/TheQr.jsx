'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import qrcode from 'qrcode'
import React, { useEffect, useMemo, useState } from 'react'
import { TheSpin } from '@the-/ui-spin'
import {
  base64ToBlob,
  eventHandlersFor,
  htmlAttributesFor,
} from '@the-/util-ui'

/**
 * QRCode the-component
 */
const TheQr = React.memo((props) => {
  const {
    alt,
    asLink,
    children,
    className,
    displaySize,
    onError,
    onGenerate,
    size,
    text,
  } = props
  const [spinning, setSpinning] = useState(false)
  const [image, setImage] = useState(null)
  const Wrapper = useMemo(() => {
    if (asLink) {
      return (props) => {
        const handleClick = () => {
          const blob = base64ToBlob(image)
          const blobUrl = URL.createObjectURL(blob)
          window.open(blobUrl, '_blank')
          URL.revokeObjectURL(blobUrl)
        }
        return (
          <a {...props} onClick={handleClick}>
            {props.children}
          </a>
        )
      }
    }
    return 'div'
  }, [asLink, image])
  useEffect(() => {
    if (!text) {
      setImage(null)
      return
    }
    setSpinning(true)
    qrcode.toDataURL(
      text,
      {
        scale: size / 16,
      },
      (err, image) => {
        if (err) {
          onError && onError(err)
        } else {
          onGenerate && onGenerate(image)
        }
        setSpinning(false)
        setImage(image)
      },
    )
  }, [text, onError, onGenerate])

  const style = { height: displaySize || size, width: displaySize || size }

  return (
    <Wrapper
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-qr', className)}
      style={style}
    >
      {spinning && <TheSpin className='the-qr-spin' cover enabled={spinning} />}
      <img
        className='the-qr-img'
        height={size}
        src={image}
        style={style}
        width={size}
      />
      {!text && <div className='the-qr-alt'>{alt}</div>}
      {children}
    </Wrapper>
  )
})

TheQr.propTypes = {
  /** Alt text */
  alt: PropTypes.string,
  /** Render as Link */
  asLink: PropTypes.bool,
  /** Handle error */
  onError: PropTypes.func,
  /** Handle image generate */
  onGenerate: PropTypes.func,
  /** QRCode size */
  size: PropTypes.number,
  /** Text to render as QR */
  text: PropTypes.string,
}

TheQr.defaultProps = {
  alt: 'NO TEXT FOUND',
  asLink: false,
  displaySize: null,
  onError: (err) => console.error(err),
  onGenerate: () => {},
  size: 256,
  text: '',
}

TheQr.displayName = 'TheQr'

export default TheQr
