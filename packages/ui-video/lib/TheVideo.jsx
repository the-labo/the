'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Video for the-components
 */
class TheVideo extends React.Component {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
    this.resizeTimer = -1

    this.state = {
      failed: false,
      loading: true,
    }

    this.videoRef = React.createRef()
    this.handleLoad = this.handleLoad.bind(this)
    this.handleError = this.handleError.bind(this)
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    const {
      props: { resizeInterval },
    } = this
    if (resizeInterval > 0) {
      this.resizeTimer = setInterval(() => this.resize(), resizeInterval)
    }
  }

  componentDidUpdate(prevProps) {
    const { src } = prevProps
    const {
      props: { src: nextSrc },
    } = this
    const isNewSrc = nextSrc && nextSrc !== src
    if (isNewSrc) {
      this.setState({
        failed: false,
        loading: true,
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
    this.setState({ loading: false })
  }

  handleLoad(e) {
    const {
      props: { onLoad },
    } = this
    onLoad && onLoad(e)
    this.setState({ loading: false })
    this.resize()
  }

  render() {
    const { props, state } = this
    const {
      alt,
      asLink,
      autoPlay,
      children,
      className,
      controls,
      height,
      loop,
      muted,
      notFoundMessage,
      playsInline,
      poster,
      preload,
      scale,
      spinning,
      src,
      width,
    } = props
    const { failed } = state
    const Wrap = asLink ? 'a' : 'div'
    const asLinkProps = asLink ? { href: src, target: '_blank' } : {}
    return (
      <Wrap
        {...htmlAttributesFor(props, {
          except: ['className', 'preload', 'width', 'height', 'src'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-video', className, `the-video-${scale}`)}
        style={{ height, width }}
        {...asLinkProps}
        ref={this.elmRef}
      >
        <div className='the-video-inner'>
          {src && spinning && (
            <div className='the-video-spinner'>
              <TheIcon.Spin />
            </div>
          )}
          {failed && (
            <span className='the-video-failed'>{notFoundMessage}</span>
          )}
          {
            <video
              alt={alt}
              autoPlay={autoPlay}
              className={c('the-video-video', {
                'the-video-video-failed': failed,
              })}
              controls={controls}
              height={height}
              loop={loop}
              muted={muted}
              onCanPlay={this.handleLoad}
              onError={this.handleError}
              playsInline={playsInline}
              poster={poster}
              preload={preload}
              ref={this.videoRef}
              src={src}
              width={width}
            />
          }

          {children}
        </div>
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
      state: { actualHeight, actualWidth, loading },
    } = this
    if (loading) {
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

TheVideo.propTypes = {
  /** Image width */
  /** Render as link */
  asLink: PropTypes.bool,
  /** Image height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Message when not found */
  notFoundMessage: PropTypes.string,
  /** Handler for failed event */
  onError: PropTypes.func,
  /** Handler for load event */
  onLoad: PropTypes.func,
  playsInline: PropTypes.bool,
  /** Interval for resize */
  resizeInterval: PropTypes.number,
  /** How to scale video */
  scale: PropTypes.oneOf(['none', 'fit', 'fill']),
  /** Handle video ref */
  videoRef: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheVideo.defaultProps = {
  asLink: false,
  height: 'auto',
  notFoundMessage: 'Not Found',
  onError: null,
  onLoad: null,
  onVideo: () => {},
  playsInline: false,
  preload: 'metadata',
  resizeInterval: -1,
  scale: 'fill',
  width: 'auto',
}

TheVideo.displayName = 'TheVideo'

export default TheVideo
