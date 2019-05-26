'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import theDate from '@the-/date'
import { TheCondition } from '@the-/ui-condition'
import { TheImage } from '@the-/ui-image'
import { TheVideo } from '@the-/ui-video'
import { colorWithText, textColorFor } from '@the-/util-color'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Chat Time line item
 */
class TheChatTimeLineItem extends React.Component {
  constructor() {
    super(...arguments)
    this.handleWho = this.handleWho.bind(this)
  }

  handleWho() {
    const {
      props: { onWho, who },
    } = this
    onWho && onWho(who)
  }

  render() {
    const {
      props,
      props: {
        align,
        at,
        atText,
        children,
        className,
        image,
        node,
        onWho,
        raw,
        status,
        text,
        video,
        who,
        who: {
          color: whoColor = colorWithText(who.name, {
            base: this.props.whoBaseColor,
          }),
        },
        whoImageSize,
      },
    } = this

    if (raw) {
      return <div className='the-chat-time-line-item-raw'>{node}</div>
    }
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-chat-time-line-item', className, {
          'the-chat-time-line-item-left': align === 'left',
          'the-chat-time-line-item-right': align === 'right',
        })}
      >
        <div className='the-chat-time-line-item-col the-chat-time-line-item-col-who'>
          <TheCondition if={!!who.image}>
            <TheImage
              className={c('the-chat-time-line-item-who-image', {
                'the-chat-time-line-item-clickable': !!onWho,
              })}
              height={whoImageSize}
              onClick={this.handleWho}
              scale='fill'
              src={who.image}
              style={{
                backgroundColor: whoColor,
                borderColor: whoColor,
                color: textColorFor(whoColor),
              }}
              width={whoImageSize}
            />
          </TheCondition>
          <TheCondition unless={!!who.image}>
            <div
              className={c('the-chat-time-line-item-who-image', {
                'the-chat-time-line-item-clickable': !!onWho,
              })}
              onClick={this.handleWho}
              style={{
                backgroundColor: whoColor,
                borderColor: whoColor,
                color: textColorFor(whoColor),
                height: `${whoImageSize}px`,
                width: `${whoImageSize}px`,
              }}
            >
              {who.initial || who.name}
            </div>
          </TheCondition>
        </div>
        <div className='the-chat-time-line-item-col'>
          <div
            className='the-chat-time-line-item-who-name'
            onClick={this.handleWho}
          >
            {who.name}
          </div>
          <TheCondition if={!!text}>
            <div className='the-chat-time-line-item-content'>
              <div className='the-chat-time-line-item-text'>
                <div className='the-chat-time-line-item-text-tail' />
                <div>
                  {(text || '')
                    .split('\n')
                    .reduce(
                      (lines, line, i) =>
                        [
                          ...lines,
                          lines.length > 0 ? <br key={i} /> : null,
                          line,
                        ].filter(Boolean),
                      [],
                    )}
                </div>
              </div>
            </div>
          </TheCondition>
          <TheCondition if={!!node}>
            <div className='the-chat-time-line-item-content'>
              <div className='the-chat-time-line-item-node'>{node}</div>
            </div>
          </TheCondition>
          <TheCondition if={!!image}>
            <div className='the-chat-time-line-item-content'>
              <TheImage
                className='the-chat-time-line-item-image'
                scale='fit'
                width='100%'
                {...(typeof image === 'string' ? { src: image } : image)}
              />
            </div>
          </TheCondition>
          <TheCondition if={!!video}>
            <div className='the-chat-time-line-item-content'>
              <TheVideo
                className='video'
                controls
                scale='fit'
                width='100%'
                {...(typeof video === 'string' ? { src: video } : video)}
              />
            </div>
          </TheCondition>
          {children}
        </div>
        <div className='the-chat-time-line-item-col the-chat-time-line-item-col-state'>
          <div />
          <div>
            <div className='the-chat-time-line-item-state'>{status}</div>
            <div className='the-chat-time-line-item-date'>
              {atText || theDate(at).format(TheChatTimeLineItem.TIME_FORMAT)}
            </div>
          </div>
        </div>
        <div className='the-chat-time-line-item-col the-chat-time-line-item-col-spacer' />
      </div>
    )
  }
}

TheChatTimeLineItem.propTypes = {
  /** Date of the item */
  /** Content align */
  align: PropTypes.oneOf(['left', 'right']),
  at: PropTypes.instanceOf(Date).isRequired,
  /** Image Url */
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Handler for click who */
  onWho: PropTypes.func,
  /** Status text */
  status: PropTypes.string,
  /** Text */
  text: PropTypes.string,
  /** Video url */
  video: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Who posts */
  who: PropTypes.object.isRequired,
  /** Base color of who */
  whoBaseColor: PropTypes.string,
  /** Image size of who */
  whoImageSize: PropTypes.number,
}

TheChatTimeLineItem.defaultProps = {
  align: 'left',
  at: null,
  image: null,
  onWho: () => null,
  status: null,
  text: null,
  video: null,
  who: {},
  whoBaseColor: TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR,
  whoImageSize: TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE,
}

TheChatTimeLineItem.displayName = 'TheChatTimeLineItem'

TheChatTimeLineItem.DEFAULT_WHO_IMAGE_SIZE = 42
TheChatTimeLineItem.DEFAULT_WHO_BASE_COLOR = '#58E'
TheChatTimeLineItem.TIME_FORMAT = 'HH:mm'

export default TheChatTimeLineItem
