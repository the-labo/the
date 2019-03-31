'use strict'

import c from 'classnames'
import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheImage } from '@the-/ui-image'
import { isVideoSrc } from '@the-/util-ui'
import { TheVideo } from '@the-/ui-video'

class TheFlickImage extends React.Component {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
    this.innerRef = React.createRef()
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleLoad(e) {
    const { onLoad } = this.props
    onLoad && onLoad(e)
  }

  render() {
    const { alt, description, src, title, type } = this.props

    const isVideo = type === 'video' || isVideoSrc(src)
    return (
      <div className='the-flick-image' ref={this.elmRef}>
        <div className='the-flick-image-inner' ref={this.innerRef}>
          <TheCondition if={isVideo}>
            <TheVideo
              className={c('the-flick-image-image')}
              controls
              onLoad={this.handleLoad}
              preload='metadata'
              scale='fit'
              {...{ alt, src }}
            />
          </TheCondition>
          <TheCondition unless={isVideo}>
            <TheImage
              className={c('the-flick-image-image')}
              scale='fit'
              {...{ alt, src }}
              height='auto'
              width='auto'
            />
          </TheCondition>
          <div className='the-flick-image-info'>
            <TheCondition if={Boolean(title)}>
              <h3 className='the-flick-image-title'>{title}</h3>
            </TheCondition>
            <TheCondition if={Boolean(description)}>
              <div className='the-flick-image-description'>{description}</div>
            </TheCondition>
          </div>
        </div>
      </div>
    )
  }
}

export default TheFlickImage
