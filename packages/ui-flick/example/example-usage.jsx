'use strict'

import React from 'react'
import { TheButton, TheButtonStyle } from '@the-/ui-button'
import { TheFlick, TheFlickStyle } from '@the-/ui-flick'
import { TheImageStyle } from '@the-/ui-image'
import { TheSpinStyle } from '@the-/ui-spin'
import { TheVideoStyle } from '@the-/ui-video'

const imageUrls = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/04.jpg',
]

const videoUrls = ['./mov_bbb.mp4']

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1,
      present: true,
    }
  }

  render() {
    return (
      <div>
        <TheButtonStyle />
        <TheSpinStyle />
        <TheImageStyle />
        <TheVideoStyle />
        <TheFlickStyle />

        <TheButton onClick={() => this.setState({ present: true })}>
          Show Flick Images
        </TheButton>
        <TheFlick
          activeIndex={this.state.activeIndex}
          images={[
            imageUrls[0],
            { spinning: true, src: imageUrls[1] },
            { src: imageUrls[2], title: 'Some title' },
            {
              description: 'This is image description',
              src: imageUrls[3],
              title: 'Some title',
            },
            { src: videoUrls[0], title: 'Some video' },
          ]}
          onChange={({ activeIndex }) => this.setState({ activeIndex })}
          onClose={() => this.setState({ present: false })}
          present={this.state.present}
        />
      </div>
    )
  }
}

export default ExampleComponent
