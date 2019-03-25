'use strict'

import React from 'react'
import { TheFlick, TheFlickStyle } from '@the-/flick'
import { TheButton, TheButtonStyle } from '@the-/button'
import { TheSpinStyle } from '@the-/spin'
import { TheImageStyle } from '@the-/image'
import { TheVideoStyle } from '@the-/video'

const imageUrls = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/04.jpg',
]

const videoUrls = [
  './mov_bbb.mp4'
]

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 1,
      present: true
    }
  }

  render () {
    return (
      <div>
        <TheButtonStyle/>
        <TheSpinStyle/>
        <TheImageStyle/>
        <TheVideoStyle/>
        <TheFlickStyle/>

        <TheButton onClick={() => this.setState({present: true})}>
          Show Flick Images
        </TheButton>
        <TheFlick activeIndex={this.state.activeIndex}
                  onChange={({activeIndex}) => this.setState({activeIndex})}
                  present={this.state.present}
                  onClose={() => this.setState({present: false})}
                  images={[
                    imageUrls[0],
                    {src: imageUrls[1], spinning: true},
                    {src: imageUrls[2], title: 'Some title'},
                    {src: imageUrls[3], title: 'Some title', description: 'This is image description'},
                    {src: videoUrls[0], title: 'Some video'}
                  ]}
        />
      </div>

    )
  }
}

export default ExampleComponent
