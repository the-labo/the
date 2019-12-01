'use strict'

import React from 'react'
import { TheLink } from '@the-/ui-link'
import { TheRoute, TheRouteStack } from '@the-/ui-route'
import { TheRouteStyle } from '@the-/ui-route/styles'
import { TheRouter } from '@the-/ui-router'
import { TheSpinStyle } from '@the-/ui-spin/styles'

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { i: 0, vertical: false }
    this.toggleVertical = this.toggleVertical.bind(this)
    setInterval(() => {
      // this.setState({i: this.state.i + 1})
    }, 1000)
  }

  render() {
    return (
      <div>
        <TheSpinStyle />
        <TheRouteStyle />

        <br />
        <TheRouter.Hash>
          <TheLink exact to='/s1'>
            Show Stack
          </TheLink>
          <TheLink exact to='/'>
            Hide Stack
          </TheLink>
          <a onClick={this.toggleVertical}>Change direction</a>
          <TheRoute.Switch>
            <TheRoute path='/s1'>
              <TheRouteStack
                direction={this.state.vertical ? 'vertical' : 'horizontal'}
                stack={[
                  [
                    '/s1',
                    class View01 extends React.Component {
                      componentDidMount() {
                        console.log('View01 did mount')
                      }

                      render() {
                        return (
                          <div style={{ background: '#EAA', padding: '50px' }}>
                            <h3>This is view 01</h3>

                            <br />
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <span> </span>
                              <TheLink to='/s1/v2'>
                                Go to view 02 &gt;&gt;
                              </TheLink>
                            </div>
                          </div>
                        )
                      }
                    },
                  ],
                  [
                    '/s1/v2',
                    class View02 extends React.Component {
                      componentDidMount() {
                        console.log('View02 did mount')
                      }

                      render() {
                        const {
                          props: { pop },
                        } = this
                        return (
                          <div
                            style={{
                              background: '#AEA',
                              height: 920,
                              padding: '50px',
                            }}
                          >
                            <h3>This is view 02</h3>
                            <br />

                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <a onClick={pop}> &lt;&lt; Back to view 01</a>
                              <TheLink to='/s1/v2/v3'>
                                Go to view 03 &gt;&gt;
                              </TheLink>
                            </div>
                          </div>
                        )
                      }
                    },
                  ],
                  [
                    '/s1/v2/v3',
                    class View03 extends React.Component {
                      componentDidMount() {
                        console.log('View03 did mount')
                        const {
                          props: { history, location },
                        } = this
                        history.replace(`${location.pathname}?a=b`)
                      }

                      render() {
                        const {
                          props: { pop },
                        } = this
                        return (
                          <div style={{ background: '#AAE', padding: '50px' }}>
                            <h3>This is view 03</h3>
                            <br />
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <a onClick={() => pop()}>
                                &lt;&lt; Back to view 02
                              </a>
                              <span />
                            </div>
                          </div>
                        )
                      }
                    },
                  ],
                ]}
                style={{ border: '4px solid #555' }}
              />
            </TheRoute>
          </TheRoute.Switch>
          <br />
          <hr />
          <br />
          <h3>404</h3>
          <TheRoute.Status code='404'>
            <div>Page not found!</div>
          </TheRoute.Status>
        </TheRouter.Hash>
      </div>
    )
  }

  toggleVertical() {
    this.setState((prevState) => ({ vertical: !prevState.vertical }))
  }
}

export default ExampleComponent
