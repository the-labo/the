'use strict'

import React from 'react'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheIcon } from '@the-/ui-icon'
import { TheDropdownMenu } from '@the-/ui-menu'
import { TheMenuStyle } from '@the-/ui-menu/styles'
import { TheRouter } from '@the-/ui-router'
import { TheSpinStyle } from '@the-/ui-spin/styles'
import { TheView } from '@the-/ui-view'
import { TheViewStyle } from '@the-/ui-view/styles'

const ExampleComponent = () => {
  const { Body, Header } = TheView
  return (
    <div>
      <TheRouter.Hash>
        <TheSpinStyle />
        <TheMenuStyle />
        <TheButtonStyle />
        <TheViewStyle />
        <TheView>
          <Header
            icon='fa fa-car'
            leftIcon={TheView.BACK_ICON}
            leftTo='/'
            onRightClick={() => console.log('Right clicked!')}
            rightIcon={TheView.DROPDOWN_ICON}
            text='This is a view'
          />
          <Body>
            <div>
              <TheView.Message>This is view message</TheView.Message>
            </div>
          </Body>
        </TheView>

        <hr />

        <TheView spinning />

        <hr />

        <TheView>
          <Header
            icon='fa fa-car'
            leftIcon={TheView.BACK_ICON}
            leftText='Back'
            leftTo='/'
            onRightClick={() => console.log('Right clicked!')}
            rightNode={
              <TheDropdownMenu
                icon=''
                label={<TheIcon className={TheView.DROPDOWN_ICON} />}
                righted
              >
                <TheDropdownMenu.Item>Menu A</TheDropdownMenu.Item>
                <TheDropdownMenu.Item>Menu B</TheDropdownMenu.Item>
              </TheDropdownMenu>
            }
            rightText='Menu'
            text='This is a view'
          />
        </TheView>
      </TheRouter.Hash>
    </div>
  )
}

export default ExampleComponent
