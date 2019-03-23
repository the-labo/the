'use strict'

import React from 'react'
import { TheListGroup, TheList, TheListStyle } from '@the-/list'
import { TheSpinStyle } from '@the-/spin'
import { TheRouter } from 'the-router'

const IMAGE_URL = 'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg'

class ExampleComponent extends React.PureComponent {
  render () {
    const {Item} = TheList
    return (
      <div>
        <TheRouter.Hash>
          <TheSpinStyle/>
          <TheListStyle/>
          <TheListGroup>
            <TheListGroup.Header>Normal List</TheListGroup.Header>
            <TheListGroup.Body>
              <TheList>
                <Item disclosure>Foo</Item>
                <Item>Bar</Item>
                <Item disclosure>This is a very very very very very very very very very very
                  very very very very very very very very very very very long
                  content!</Item>
                <Item to='/about' disclosure>about</Item>
                <Item thumbnail={IMAGE_URL} disclosure>With Image</Item>
                <Item icon='fas fa-car'
                      onThumbnail={() => console.log('Thumbnail clicked')}
                      thumbnail={IMAGE_URL} disclosure>With Icon</Item>

                <Item title='This is Title'
                      subTitle='This is Sub title'
                      appendix='This is appendix'
                />

                <Item title='This is Title'
                      subTitle='This is Sub title'
                >With sub content</Item>
              </TheList>
              <TheList alt={'This is empty list'}>
              </TheList>
            </TheListGroup.Body>

            <TheListGroup.Header>Horizontal List</TheListGroup.Header>
            <TheListGroup.Body>
              <TheList horizontal>
                <Item disclosure>Foo</Item>
                <Item>Bar</Item>
                <Item disclosure>This is a very very very very very very very very very very
                  very very very very very very very very very very very long
                  content!</Item>
                <Item to='/about' disclosure>about</Item>
                <Item thumbnail={IMAGE_URL} disclosure>With Image</Item>

                <Item title='This is Title'
                      subTitle='This is Sub title'
                />

                <Item title='This is Title'
                      subTitle='This is Sub title'
                >With sub content</Item>

                <Item title='This is Title'
                      subTitle='This is Sub title'
                      appendix={'This is appendix'}
                >With sub content</Item>
              </TheList>
            </TheListGroup.Body>
          </TheListGroup>
        </TheRouter.Hash>
      </div>

    )
  }
}

export default ExampleComponent
