'use strict'

import React from 'react'
import { TheImage, TheImageStyle } from '@the-/ui-image'

const IMAGE_URL = 'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg'

class ExampleComponent extends React.PureComponent {
  render () {
    const width = 120
    const height = 120
    return (
      <div>
        <TheImageStyle/>
        <TheImage {...{width, height}} src={IMAGE_URL} scale='none'/>
        <TheImage {...{width, height}} src={IMAGE_URL} scale='fill'/>
        <TheImage {...{width, height}} src={IMAGE_URL} scale='fit'/>
        <TheImage {...{width, height}} src={'__invalid_url__'}/>
        <TheImage {...{width, height}} src={IMAGE_URL} scale='fit' asLink/>

        <hr/>

        <TheImage width='30vw' height='30vh' resizeInterval={500} src={IMAGE_URL} scale='fit'/>

        <hr/>
        <div style={{width: 120, height: 120, background: '#CCC'}}>
          <TheImage height="24px" width='33%' src={IMAGE_URL} scale='fill' asLink/>
          <TheImage height="24px" width='33%' src={IMAGE_URL} scale='fill' asLink/>
          <TheImage height="24px" width='33%' src={IMAGE_URL} scale='fill'/>
        </div>
      </div>

    )
  }
}

export default ExampleComponent
