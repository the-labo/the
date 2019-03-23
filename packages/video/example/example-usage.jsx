'use strict'

import React from 'react'
import { TheVideo, TheVideoStyle } from '@the-/video'
import { TheIconStyle } from '@the-/icon'

const VIDEO_URL = './mov_bbb.mp4'

class ExampleComponent extends React.PureComponent {
  render() {
    const width = 120
    const height = 120
    return (
      <div>
        <TheIconStyle />
        <TheVideoStyle />
        <TheVideo controls {...{ width, height }} src={VIDEO_URL} scale='none' />
        <TheVideo controls {...{ width, height }} src={VIDEO_URL} scale='fill' />
        <TheVideo controls {...{ width, height }} src={VIDEO_URL} scale='fit' />
        <TheVideo controls {...{ width, height }} src={'__invalid_url__'} />
        <TheVideo controls {...{ width, height }} src={VIDEO_URL} scale='fit' asLink />
        <TheVideo controls {...{ width, height }} src={null} scale='fit' />


        <hr />
        <div style={{ width: 120, height: 120, background: '#CCC' }}>
          <TheVideo height="24px" width='33%' src={VIDEO_URL} scale='fill' asLink />
          <TheVideo height="24px" width='33%' src={VIDEO_URL} scale='fill' asLink />
          <TheVideo height="24px" width='33%' src={VIDEO_URL} scale='fill' />
        </div>
      </div>

    )
  }
}

export default ExampleComponent
