'use strict'

import React from 'react'
import { TheList, TheListGroup, TheListStyle } from '@the-/ui-list'
import { TheRouter } from '@the-/ui-router'
import { TheSpinStyle } from '@the-/ui-spin'

const IMAGE_URL =
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg'

class ExampleComponent extends React.PureComponent {
  render() {
    const { Item } = TheList
    return (
      <div>
        <TheRouter.Hash>
          <TheSpinStyle />
          <TheListStyle />
          <TheListGroup>
            <TheListGroup.Header>Normal List</TheListGroup.Header>
            <TheListGroup.Body>
              <TheList>
                <Item disclosure>Foo</Item>
                <Item>Bar</Item>
                <Item disclosure>
                  This is a very very very very very very very very very very
                  very very very very very very very very very very very long
                  content!
                </Item>
                <Item disclosure to='/about'>
                  about
                </Item>
                <Item disclosure thumbnail={IMAGE_URL}>
                  With Image
                </Item>
                <Item
                  disclosure
                  icon='fas fa-car'
                  onThumbnail={() => console.log('Thumbnail clicked')}
                  thumbnail={IMAGE_URL}
                >
                  With Icon
                </Item>

                <Item
                  appendix='This is appendix'
                  subTitle='This is Sub title'
                  title='This is Title'
                />

                <Item subTitle='This is Sub title' title='This is Title'>
                  With sub content
                </Item>
              </TheList>
              <TheList alt='This is empty list' />
            </TheListGroup.Body>

            <TheListGroup.Header>Horizontal List</TheListGroup.Header>
            <TheListGroup.Body>
              <TheList horizontal>
                <Item disclosure>Foo</Item>
                <Item>Bar</Item>
                <Item disclosure>
                  This is a very very very very very very very very very very
                  very very very very very very very very very very very long
                  content!
                </Item>
                <Item disclosure to='/about'>
                  about
                </Item>
                <Item disclosure thumbnail={IMAGE_URL}>
                  With Image
                </Item>

                <Item subTitle='This is Sub title' title='This is Title' />

                <Item subTitle='This is Sub title' title='This is Title'>
                  With sub content
                </Item>

                <Item
                  appendix='This is appendix'
                  subTitle='This is Sub title'
                  title='This is Title'
                >
                  With sub content
                </Item>
              </TheList>
            </TheListGroup.Body>
          </TheListGroup>
        </TheRouter.Hash>
      </div>
    )
  }
}

export default ExampleComponent
