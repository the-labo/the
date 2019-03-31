'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/icon'
import { TheImage } from '@the-/image'
import { TheLink } from '@the-/link'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'

/**
 * Item of list
 */
class TheListItem extends React.Component {
  static Col(props) {
    const { children, className, wide = false } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={c('the-list-item-col', className, {
          'the-list-item-col-wide': wide,
        })}
      >
        {children}
      </div>
    )
  }

  static SubTitle(props) {
    const { className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={c('the-list-item-sub-title', className, {})}
      >
        {props.subTitle}
      </div>
    )
  }

  static Title(props) {
    const { className } = props
    return (
      <h3
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={c('the-list-item-title', className, {})}
      >
        {props.title}
      </h3>
    )
  }

  constructor() {
    super(...arguments)
    this.handleThumbnail = this.handleThumbnail.bind(this)
  }

  handleThumbnail(e) {
    e.stopPropagation()
    e.preventDefault()
    const { onThumbnail, thumbnail } = this.props
    onThumbnail && onThumbnail(thumbnail)
  }

  render() {
    const { props } = this
    const { Col, SubTitle, Title } = TheListItem
    const {
      appendix,
      borderless,
      children,
      className,
      disclosure,
      icon,
      subTitle,
      thumbnail,
      thumbnailHeight,
      thumbnailWidth,
      title,
      to,
    } = props
    const Inner = to ? TheLink : 'span'
    return (
      <li
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-list-item', className, {
          'the-list-item-borderless': borderless,
        })}
      >
        <Inner className='the-list-item-inner' to={to}>
          {icon && (
            <Col>
              <TheIcon className={c('the-list-item-icon', icon)} />
            </Col>
          )}
          {thumbnail && (
            <Col>
              <TheImage
                className='the-list-item-image'
                height={thumbnailHeight}
                onClick={this.handleThumbnail}
                src={thumbnail}
                width={thumbnailWidth}
              />
            </Col>
          )}
          <Col wide>
            {title && <Title {...{ title }} />}
            {subTitle && <SubTitle {...{ subTitle }} />}
            {children}
          </Col>
          {appendix && <Col>{appendix}</Col>}
          {disclosure && (
            <Col>
              <TheIcon
                className={c('the-list-item-icon', TheListItem.DISCLOSURE_ICON)}
              />
            </Col>
          )}
        </Inner>
      </li>
    )
  }
}

TheListItem.DISCLOSURE_ICON = 'fa fa-angle-right'

TheListItem.propTypes = {
  /** Appendix */
  appendix: PropTypes.node,
  /** Render with borderless style */
  borderless: PropTypes.bool,
  /** Show disclosure icon */
  disclosure: PropTypes.bool,
  /** Icon class */
  icon: PropTypes.string,
  /** Sub title text */
  subTitle: PropTypes.node,
  /** Thumbnail image url */
  thumbnail: PropTypes.string,
  /** Height of thumbnail */
  thumbnailHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Width of thumbnail */
  thumbnailWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Title text */
  title: PropTypes.node,
  /** Link to */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

TheListItem.defaultProps = {
  appendix: null,
  borderless: false,
  disclosure: false,
  onThumbnail: null,
  role: 'listitem',
  subTitle: null,
  thumbnail: null,
  thumbnailHeight: 72,
  thumbnailWidth: 72,
  title: null,
  to: null,
}

TheListItem.displayName = 'TheListItem'

export default TheListItem
