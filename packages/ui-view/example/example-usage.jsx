'use strict'

import React from 'react'
import { TheView, TheViewStyle } from '@the-/ui-view'
import { TheIcon } from '@the-/icon'
import { TheSpinStyle } from '@the-/spin'
import { TheButtonStyle } from '@the-/button'
import { TheMenuStyle, TheDropdownMenu } from '@the-/menu'
import { TheRouter } from '@the-/router'

class ExampleComponent extends React.PureComponent {
  render () {
    const {Header, Body} = TheView
    return (
      <div>
        <TheRouter.Hash>
          <TheSpinStyle/>
          <TheMenuStyle/>
          <TheButtonStyle/>
          <TheViewStyle/>
          <TheView>
            <Header
              leftIcon={TheView.BACK_ICON}
              leftTo='/'
              icon={'fa fa-car'}
              text='This is a view'
              rightIcon={TheView.DROPDOWN_ICON}
              onRightClick={() => console.log('Right clicked!')}
            />
            <Body>
            <div>
              <TheView.Message>This is view message</TheView.Message>
            </div>
            </Body>
          </TheView>

          <hr/>

          <TheView spinning/>

          <hr/>

          <TheView>
            <Header leftIcon={TheView.BACK_ICON}
                    leftText='Back'
                    leftTo='/'
                    text='This is a view'
                    icon='fa fa-car'
                    rightText='Menu'
                    onRightClick={() => console.log('Right clicked!')}
                    rightNode={
                      <TheDropdownMenu icon={''}
                                       label={<TheIcon className={TheView.DROPDOWN_ICON}></TheIcon>}
                                       righted
                      >
                        <TheDropdownMenu.Item>Menu A</TheDropdownMenu.Item>
                        <TheDropdownMenu.Item>Menu B</TheDropdownMenu.Item>
                      </TheDropdownMenu>
                    }
            />
          </TheView>

        </TheRouter.Hash>
      </div>

    )
  }
}

export default ExampleComponent
