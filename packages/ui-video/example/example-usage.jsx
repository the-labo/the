'use strict'

import React from 'react'
import { TheIconStyle } from '@the-/ui-icon'
import { TheVideo, TheVideoStyle } from '@the-/ui-video'

const VIDEO_URL = './mov_bbb.mp4'

class ExampleComponent extends React.PureComponent {
  render() {
    const width = 120
    const height = 120
    return (
      <div>
        <TheIconStyle />
        <TheVideoStyle />
        <TheVideo
          controls
          height={height}
          scale='none'
          src={VIDEO_URL}
          width={width}
        />
        <TheVideo
          controls
          height={height}
          scale='fill'
          src={VIDEO_URL}
          width={width}
        />
        <TheVideo
          controls
          height={height}
          scale='fit'
          src={VIDEO_URL}
          width={width}
        />
        <TheVideo
          controls
          height={height}
          src={'__invalid_url__'}
          width={width}
        />
        <TheVideo
          asLink
          controls
          height={height}
          scale='fit'
          src={VIDEO_URL}
          width={width}
        />
        <TheVideo
          controls
          height={height}
          scale='fit'
          src={null}
          width={width}
        />

        <hr />
        <div style={{ background: '#CCC', height: 120, width: 120 }}>
          <TheVideo
            asLink
            height='24px'
            scale='fill'
            src={VIDEO_URL}
            width='33%'
          />
          <TheVideo
            asLink
            height='24px'
            scale='fill'
            src={VIDEO_URL}
            width='33%'
          />
          <TheVideo height='24px' scale='fill' src={VIDEO_URL} width='33%' />
        </div>
      </div>
    )
  }
}

export default ExampleComponent
