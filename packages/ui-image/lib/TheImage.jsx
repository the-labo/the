'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Image of the-components
 */
class TheImage extends React.Component {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
    this.state = {
      busy: true,
      failed: false,
    }
    this.resize = this.resize.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.resizeTimer = -1
  }

  componentDidMount() {
    const {
      props: { resizeInterval },
    } = this
    if (resizeInterval > 0) {
      this.resizeTimer = setInterval(this.resize, resizeInterval)
    }
  }

  componentDidUpdate(prevProps) {
    const { src: prevSrc } = prevProps
    const {
      props: { src },
    } = this
    const isNewSrc = src && src !== prevSrc
    if (isNewSrc) {
      this.setState({
        busy: true,
        failed: false,
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimer)
  }

  handleError(e) {
    const {
      props: { onError },
    } = this
    onError && onError(e)
    this.setState({ busy: false, failed: true })
  }

  handleLoad(e) {
    const {
      props: { onLoad },
    } = this
    onLoad && onLoad(e)
    this.setState({ busy: false })
    this.resize()
  }

  render() {
    const {
      props,
      props: {
        alt,
        asLink,
        background,
        children,
        className,
        draggable,
        height,
        loading,
        notFoundMessage,
        scale,
        src,
        style,
        width,
      },
      state: { actualHeight, actualWidth, busy, failed },
    } = this

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
        ref={this.elmRef}
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
              loading='lazy'
              onError={this.handleError}
              onLoad={this.handleLoad}
              src={src}
              width={actualWidth || width}
            />
            {children}
          </div>
        )}
      </Wrap>
    )
  }

  resize() {
    const {
      elmRef: { current: elm },
    } = this
    if (!elm) {
      return
    }

    const elmRect = elm.getBoundingClientRect()
    const {
      state: { actualHeight, actualWidth, busy },
    } = this
    if (busy) {
      return
    }

    const newActualWidth = elmRect && elmRect.width
    const newActualHeight = elmRect && elmRect.height
    const skip =
      actualWidth === newActualWidth && actualHeight === newActualHeight
    if (skip) {
      return
    }

    this.setState({
      actualHeight: newActualHeight,
      actualWidth: newActualWidth,
    })
  }
}

TheImage.propTypes = {
  /** Image width */
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
