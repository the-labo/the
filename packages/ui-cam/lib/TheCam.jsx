'use strict'

import asleep from 'asleep'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { unlessProduction } from '@the-/check'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
} from '@the-/util-ui'
import { TheMedia } from '@the-/media'
import { TheSpin } from '@the-/ui-spin'

/**
 * Embed camera component
 */
class TheCam extends React.Component {
  constructor(props) {
    super(props)
    this.videoRef = props.videoRef || React.createRef()

    const { audio, video } = props
    this.media = new TheMedia({ audio, video })
    this.handleVideoLoad = this.handleVideoLoad.bind(this)
    this.state = {
      busy: false,
      rejected: false,
      running: true,
    }
  }

  componentDidMount() {
    void this.applyEnabled(!this.props.disabled)

    const { onMedia, onVideo } = this.props
    onVideo && onVideo(this.videoRef.current)
    onMedia && onMedia(this.media)
  }

  componentDidUpdate(prevPros) {
    const diff = changedProps(prevPros, this.props)
    if ('disabled' in diff) {
      void this.applyEnabled(!diff.disabled)
    }

    unlessProduction(() => {
      if ('videoRef' in diff) {
        throw new Error(`[TheCam] Video ref can not be changed`)
      }
    })
  }

  componentWillUnmount() {
    if (this.state.running) {
      void this.stop()
    }
  }

  handleVideoLoad() {
    const { onReady } = this.props
    onReady && onReady()
  }

  render() {
    const { props, state } = this
    const {
      children,
      className,
      height,
      rejectedMessage,
      spinning,
      width,
    } = props
    const { busy, rejected } = state
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
            <React.Fragment>
              <video
                autoPlay
                className='the-cam-video'
                onLoadedData={this.handleVideoLoad}
                playsInline
                ref={this.videoRef}
              />
              {children}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  async applyEnabled(enabled) {
    if (enabled) {
      await this.start()
    } else {
      await this.stop()
    }
  }

  async start() {
    const { media } = this
    this.setState({ busy: true })
    await asleep(0)
    try {
      await media.start()
    } catch (e) {
      this.setState({ busy: false, rejected: true, running: false })
      const { onReject } = this.props
      onReject && onReject(e)
      throw e
    }
    const video = this.videoRef.current
    if (video) {
      await media.bindVideo(video, {})
      this.setState({ busy: false, rejected: false, running: true })
    }

    // Call backs
    {
      const { stream } = media
      const { onStart, onStream } = this.props
      onStream && onStream(stream)
      onStart && onStart({ cam: this, stream, video })
    }
  }

  async stop() {
    const video = this.videoRef.current
    const { media } = this
    if (video) {
      video.srcObject = null
      this.setState({ busy: false, rejected: false, running: false })
    }

    try {
      await media.stop()
    } catch (e) {
      // Do nothing
    }

    // Callbacks
    {
      const { stream } = media
      const { onStop } = this.props
      onStop && onStop({ cam: this, stream, video })
    }
  }
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
