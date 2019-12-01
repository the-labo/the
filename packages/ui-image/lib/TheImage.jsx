'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import TheIcon from '@the-/ui-icon/shim/TheIcon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Image of the-components
 */
const TheImage = (props) => {
  const {
    alt,
    asLink,
    background,
    children,
    className,
    draggable,
    height,
    loading,
    notFoundMessage,
    onError,
    onLoad,
    resizeInterval,
    scale,
    src,
    style,
    width,
  } = props
  const elmRef = useRef(null)

  const [busy, setBusy] = useState(true)
  const [failed, setFailed] = useState(false)
  const [actualHeight, setActualHeight] = useState(null)
  const [actualWidth, setActualWidth] = useState(null)

  const resize = useCallback(() => {
    if (busy) {
      return
    }

    const { current: elm } = elmRef
    if (!elm) {
      return
    }

    const elmRect = elm.getBoundingClientRect()
    if (!elmRect) {
      return
    }

    const { height: newActualHeight, width: newActualWidth } = elmRect

    const skip =
      actualWidth === newActualWidth && actualHeight === newActualHeight
    if (skip) {
      return
    }

    setActualHeight(newActualHeight)
    setActualWidth(newActualWidth)
  }, [elmRef, busy, actualWidth, actualHeight])

  useEffect(() => {
    if (resizeInterval > 0) {
      resize()
      const timer = setInterval(resize, resizeInterval)
      return () => clearInterval(timer)
    }
  }, [resizeInterval, resize])

  useEffect(() => {
    setBusy(true)
    setFailed(false)
  }, [src])

  const handleError = useCallback(
    (e) => {
      onError && onError(e)
      setBusy(false)
      setFailed(true)
    },
    [onError],
  )

  const handleLoad = useCallback(
    (e) => {
      onLoad && onLoad(e)
      setBusy(false)
      resize()
    },
    [resize, onLoad],
  )

  const Wrap = asLink ? 'a' : 'div'
  const asLinkProps = asLink ? { href: src, target: '_blank' } : {}
  const spinning = !!src && busy && !failed
  const notFound = !busy && (failed || !src)
  return (
    <Wrap
      {...htmlAttributesFor(props, {
        except: ['className', 'width', 'height', 'src', 'draggable'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-image', className, `the-image-${scale}`)}
      style={Object.assign({}, style || {}, { background, height, width })}
      {...asLinkProps}
      aria-busy={spinning}
      ref={elmRef}
    >
      {notFound ? (
        <span className='the-image-notfound'>{notFoundMessage}</span>
      ) : (
        <div className='the-image-inner'>
          {spinning && (
            <div className='the-image-spin'>
              <TheIcon.Spin />
            </div>
          )}

          <img
            alt={alt}
            className={c('the-image-img', {
              'the-image-img-failed': failed,
            })}
            draggable={draggable}
            height={actualHeight || height}
            loading={loading}
            onError={handleError}
            onLoad={handleLoad}
            src={src}
            width={actualWidth || width}
          />
          {children}
        </div>
      )}
    </Wrap>
  )
}

TheImage.propTypes = {
  /** Render as link */
  asLink: PropTypes.bool,
  /** Image draggable */
  draggable: PropTypes.bool,
  /** Image height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Message when not found */
  notFoundMessage: PropTypes.string,
  /** Handler for failed event */
  onError: PropTypes.func,
  /** Handler for load event */
  onLoad: PropTypes.func,
  /** Interval for resize */
  resizeInterval: PropTypes.number,
  /** How to scale image */
  scale: PropTypes.oneOf(['none', 'fit', 'fill']),
  /** Image width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheImage.defaultProps = {
  asLink: false,
  background: 'transparent',
  draggable: false,
  height: 'auto',
  loading: 'lazy',
  notFoundMessage: 'Not Found',
  onError: null,
  onLoad: null,
  resizeInterval: -1,
  role: 'image',
  scale: 'fill',
  width: 'auto',
}

TheImage.displayName = 'TheImage'

export default TheImage
