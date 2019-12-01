'use strict'

import React, { useState } from 'react'
import { TheButton } from '@the-/ui-button'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheFlick } from '@the-/ui-flick'
import { TheFlickStyle } from '@the-/ui-flick/styles'
import { TheImageStyle } from '@the-/ui-image/styles'
import { TheSpinStyle } from '@the-/ui-spin/styles'
import { TheVideoStyle } from '@the-/ui-video/styles'

const imageUrls = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/04.jpg',
]

const videoUrls = ['./mov_bbb.mp4']

const ExampleComponent = () => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [present, setPresent] = useState(true)
  return (
    <div>
      <TheButtonStyle />
      <TheSpinStyle />
      <TheImageStyle />
      <TheVideoStyle />
      <TheFlickStyle />

      <TheButton onClick={() => setPresent(true)}>Show Flick Images</TheButton>
      <TheFlick
        activeIndex={activeIndex}
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
        onChange={({ activeIndex }) => setActiveIndex(activeIndex)}
        onClose={() => setPresent(false)}
        present={present}
      />
    </div>
  )
}

export default ExampleComponent
