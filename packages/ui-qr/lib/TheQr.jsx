'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import qrcode from 'qrcode'
import React from 'react'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * QRCode the-component
 */
class TheQr extends React.PureComponent {
  static AWrap(props) {}

  constructor(props) {
    super(props)
    this.state = {
      spinning: false,
    }
  }

  WrapperFor() {
    const { props, state } = this
    if (props.asLink) {
      return (props) => (
        <a {...props} href={state.url} target='_blank'>
          {props.children}
        </a>
      )
    }
    return 'div'
  }

  componentDidMount() {
    const { props } = this
    this.drawAsQR(props.text)
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this
    if (props.text !== nextProps.text) {
      this.drawAsQR(nextProps.text)
    }
  }

  drawAsQR(text) {
    const { props } = this
    if (!text) {
      return
    }
    const { onError, onGenerate, size } = props
    this.setState({ spinning: true })
    qrcode.toDataURL(
      text,
      {
        scale: size / 16,
      },
      (err, url) => {
        if (err) {
          onError && onError(err)
        } else {
          onGenerate && onGenerate(url)
        }
        this.setState({
          spinning: false,
          url,
        })
      },
    )
  }

  render() {
    const {
      props,
      props: { alt, children, className, displaySize, size, text },
      state,
    } = this

    const style = { height: displaySize || size, width: displaySize || size }
    const Wrapper = this.WrapperFor()

    return (
      <Wrapper
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={classnames('the-qr', className)}
        style={style}
      >
        {state.spinning && (
          <TheSpin className='the-qr-spin' cover enabled={state.spinning} />
        )}
        <img
          className='the-qr-img'
          height={size}
          src={state.url}
          style={style}
          width={size}
        />
        {!text && <div className='the-qr-alt'>{alt}</div>}
        {children}
      </Wrapper>
    )
  }
}

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
