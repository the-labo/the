'use strict'

import React from 'react'
import { TheImage, TheImageStyle } from '@the-/ui-image'

const IMAGE_URL =
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg'

class ExampleComponent extends React.PureComponent {
  render() {
    const width = 120
    const height = 120
    return (
      <div>
        <TheImageStyle />
        <TheImage {...{ height, width }} scale='none' src={IMAGE_URL} />
        <TheImage {...{ height, width }} scale='fill' src={IMAGE_URL} />
        <TheImage {...{ height, width }} scale='fit' src={IMAGE_URL} />
        <TheImage {...{ height, width }} src={'__invalid_url__'} />
        <TheImage {...{ height, width }} asLink scale='fit' src={IMAGE_URL} />

        <hr />

        <TheImage
          height='30vh'
          resizeInterval={500}
          scale='fit'
          src={IMAGE_URL}
          width='30vw'
        />

        <hr />
        <div style={{ background: '#CCC', height: 120, width: 120 }}>
          <TheImage
            asLink
            height='24px'
            scale='fill'
            src={IMAGE_URL}
            width='33%'
          />
          <TheImage
            asLink
            height='24px'
            scale='fill'
            src={IMAGE_URL}
            width='33%'
          />
          <TheImage height='24px' scale='fill' src={IMAGE_URL} width='33%' />
        </div>
      </div>
    )
  }
}

export default ExampleComponent
