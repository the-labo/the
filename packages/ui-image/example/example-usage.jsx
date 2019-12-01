'use strict'

import React from 'react'
import { TheImage } from '@the-/ui-image'
import { TheImageStyle } from '@the-/ui-image/styles'

const IMAGE_URL =
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg'

const ExampleComponent = () => {
  const width = 120
  const height = 120
  return (
    <div>
      <TheImageStyle />
      <TheImage height={height} scale='none' src={IMAGE_URL} width={width} />
      <TheImage height={height} scale='fill' src={IMAGE_URL} width={width} />
      <TheImage height={height} scale='fit' src={IMAGE_URL} width={width} />
      <TheImage height={height} src='__invalid_url__' width={width} />
      <TheImage
        asLink
        height={height}
        scale='fit'
        src={IMAGE_URL}
        width={width}
      />

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

export default ExampleComponent
