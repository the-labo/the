'use strict'

import React from 'react'
import { TheButton, TheButtonStyle } from '@the-/ui-button'
import { TheHeader, TheHeaderStyle } from '@the-/ui-header'
import { TheRoute } from '@the-/ui-route'
import { TheRouter } from '@the-/ui-router'

class ExampleComponent extends React.PureComponent {
  static MockPage({ color, message, path }) {
    return (
      <TheRoute
        component={() => <div style={{ color }}>{message}</div>}
        path={path}
      />
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      notice: true,
    }
  }

  render() {
    const { MockPage } = ExampleComponent
    const { Logo, RightArea, Tab, TabItem } = TheHeader
    return (
      <div>
        <TheRouter.Hash>
          <TheHeaderStyle />
          <TheButtonStyle />
          <TheHeader
            notices={
              this.state.notice
                ? {
                    'you needs to verify your email': {
                      'send again': () => this.setState({ notice: false }),
                    },
                  }
                : {}
            }
          >
            <Logo>Some app</Logo>
            <Tab>
              <TabItem to='/page-a'>PageA</TabItem>
              <TabItem to='/page-b'>PageB</TabItem>
            </Tab>
            <RightArea>
              <TheButton>Login</TheButton>
              <TheButton primary>Sign Up</TheButton>
            </RightArea>
          </TheHeader>
          <div>
            <MockPage color='#83A' message='This is Page A' path='/page-a' />
            <MockPage color='#38A' message='This is Page B' path='/page-b' />

            <hr />

            <TheHeader asOverlay style={{ top: 190 }}>
              <Logo>Some app with overlay header</Logo>
              <Tab>
                <TabItem to='/page-a'>PageA</TabItem>
                <TabItem to='/page-b'>PageB</TabItem>
                <TabItem icon='fa fa-search' to='/page-b' />
              </Tab>
              <RightArea>
                <TheButton>Login</TheButton>
                <TheButton primary>Sign Up</TheButton>
              </RightArea>
            </TheHeader>

            <hr />

            <TheHeader
              asOverlay
              reversed
              ribbon='This is a ribbon'
              style={{ top: 400 }}
            >
              <Logo>Some app with overlay header</Logo>
              <Tab>
                <TabItem to='/page-a'>PageA</TabItem>
                <TabItem to='/page-b'>PageB</TabItem>
                <TabItem icon='fa fa-search' to='/page-b' />
              </Tab>
              <RightArea>
                <TheButton>Login</TheButton>
                <TheButton primary>Sign Up</TheButton>
              </RightArea>
            </TheHeader>

            <br />
            <TheHeader asStatic>
              <Logo>Some app with static header</Logo>
            </TheHeader>
          </div>
        </TheRouter.Hash>
      </div>
    )
  }
}

export default ExampleComponent
