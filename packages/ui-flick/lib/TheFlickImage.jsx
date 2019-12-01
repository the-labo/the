'use strict'

import c from 'classnames'
import React from 'react'
import TheCondition from '@the-/ui-condition/shim/TheCondition'
import TheImage from '@the-/ui-image/shim/TheImage'
import TheVideo from '@the-/ui-video/shim/TheVideo'
import { isVideoSrc } from '@the-/util-ui'

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
    const {
      props: { onLoad },
    } = this
    onLoad && onLoad(e)
  }

  render() {
    const {
      props: { alt, description, src, title, type },
    } = this

    const isVideo = type === 'video' || isVideoSrc(src)
    return (
      <div className='the-flick-image' ref={this.elmRef}>
        <div className='the-flick-image-inner' ref={this.innerRef}>
          <TheCondition if={isVideo}>
            <TheVideo
              alt={alt}
              className={c('the-flick-image-image')}
              controls
              onLoad={this.handleLoad}
              preload='metadata'
              scale='fit'
              src={src}
            />
          </TheCondition>
          <TheCondition unless={isVideo}>
            <TheImage
              alt={alt}
              className={c('the-flick-image-image')}
              height='auto'
              scale='fit'
              src={src}
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
