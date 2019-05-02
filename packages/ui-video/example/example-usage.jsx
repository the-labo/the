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
          {...{ height, width }}
          scale='none'
          src={VIDEO_URL}
        />
        <TheVideo
          controls
          {...{ height, width }}
          scale='fill'
          src={VIDEO_URL}
        />
        <TheVideo controls {...{ height, width }} scale='fit' src={VIDEO_URL} />
        <TheVideo controls {...{ height, width }} src={'__invalid_url__'} />
        <TheVideo
          controls
          {...{ height, width }}
          asLink
          scale='fit'
          src={VIDEO_URL}
        />
        <TheVideo controls {...{ height, width }} scale='fit' src={null} />

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
