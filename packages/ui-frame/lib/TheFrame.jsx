'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import TheFrameStyle from './TheFrameStyle'

/**
 * iFrame of the-components
 */
class TheFrame extends React.Component {
  constructor(props) {
    super(props)
    this.iframeRef = React.createRef()
    this.handleLoad = this.handleLoad.bind(this)
    this.state = {
      embedContent: null,
      error: null,
      loaded: false,
    }
    this.resizeTimer = -1
  }

  componentDidMount() {
    const { props } = this
    this.resizeTimer = setInterval(() => this.resize(), 300)
    void this.load(props.src)
  }

  componentDidUpdate(prevProps) {
    const { props } = this
    const changed = prevProps.src !== props.src
    if (changed) {
      this.setState({ embedContent: null, error: null, loaded: false })
      void this.load(props.src)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimer)
  }

  handleLoad(e) {
    const {
      props: { onLoad },
    } = this
    this.resize()
    this.setState({ loaded: true })
    onLoad && onLoad(e)
  }

  render() {
    const {
      props,
      props: { alt, children, className, embed, spinning, src },
      state: { embedContent, error },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['className', 'src', 'spinning', 'alt'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-frame', className)}
      >
        <TheSpin className='the-frame-spin' cover enabled={spinning} />
        <TheCondition if={!embed}>
          <iframe
            className='the-frame-iframe'
            onLoad={this.handleLoad}
            ref={this.iframeRef}
            src={src}
          />
        </TheCondition>
        <TheCondition if={embed}>
          <div
            className='the-frame-embed-content'
            dangerouslySetInnerHTML={{ __html: embedContent }}
          />
        </TheCondition>
        <TheCondition if={!!error}>
          <div className='the-frame-alt'>{alt}</div>
        </TheCondition>
        {children}
      </div>
    )
  }

  resize() {
    const {
      iframeRef: { current: iframe },
    } = this
    if (!iframe) {
      return
    }
    const document = iframe.contentDocument || iframe.contentWindow.document
    if (!document) {
      return
    }
    const { body } = document
    if (!body) {
      return
    }
    iframe.style.height = `${body.scrollHeight}px`
  }

  async load(src) {
    const {
      props: { embed },
    } = this
    if (embed) {
      await this.loadAsEmbed(src)
    }
  }

  async loadAsEmbed(src) {
    const isRelative = /^\/|^\./.test(src)
    if (!isRelative) {
      throw new Error(
        `[TheFrame] Invalid src to embed: ${src} (Only relative path allowed for secure reason)`,
      )
    }
    const fetch = get('fetch')
    if (fetch) {
      const res = await fetch(src)
      const text = await res.text()
      this.setState({ embedContent: text })
    } else {
      throw new Error('[TheFrame] Failed to ')
    }
  }
}

TheFrame.Style = TheFrameStyle

TheFrame.propTypes = {
  /** Alt text */
  alt: PropTypes.string,
  /** Enbed source content as dynamic html */
  embed: PropTypes.bool,
  /** Handler for Load */
  onLoad: PropTypes.func,
  /** Spinning or not */
  spinning: PropTypes.bool,
  /** Source URL */
  src: PropTypes.string.isRequired,
}

TheFrame.defaultProps = {
  alt: 'Page Not Found',
  embed: false,
  onLoad: null,
  spinning: false,
  src: null,
}

TheFrame.displayName = 'TheFrame'

export default TheFrame
