'use strict'

import React from 'react'
import { TheChat, TheChatStyle } from '@the-/ui-chat'
import { TheImageStyle } from '@the-/ui-image'
import { TheInputStyle } from '@the-/ui-input'
import { TheButtonStyle } from '@the-/ui-button'
import { TheVideoStyle } from '@the-/ui-video'
import { TheSpinStyle } from '@the-/ui-spin'
import { TheFormStyle } from '@the-/ui-form'

const images = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg'
]

const videos = [
  './mov_bbb.mp4'
]

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    this._timer = null
    this.state = {
      form: {},
      items: [
        {
          at: new Date('2017/10/01 12:34'),
          text: 'This is the first post from John',
          who: {
            name: 'John',
            image: images[0]
          }
        },
        {
          at: new Date('2017/10/02 12:34'),
          text: 'This is the second post from John',
          who: {
            name: 'John',
            image: images[0]
          }
        },
        {
          at: new Date('2017/10/03 12:34'),
          node: <span>This is the third post from John</span>,
          who: {
            name: 'John',
            image: images[0]
          }
        },
        {
          at: new Date('2017/10/08 12:38'),
          video: videos[0],
          who: {
            name: 'John The Video',
            image: images[1],
          }
        },
        {
          at: new Date('2017/10/08 14:38'),
          image: images[2],
          align: 'right',
          text: `This is an text\n hoge fuge fuge`,
          status: 'Read',
          who: {
            name: 'hoge',
          }
        },
        {
          raw: true,
          at: new Date('2017/10/08 14:44'),
          node: <h3>this is some raw data</h3>,
        },
        {
          at: new Date('2017/10/08 14:38'),
          image: images[2],
          align: 'right',
          who: {
            name: 'hoge',
            image: images[0]
          }
        },
      ]
    }
  }

  render () {
    const { items } = this.state
    return (
      <div>
        <TheVideoStyle/>
        <TheButtonStyle/>
        <TheInputStyle/>
        <TheImageStyle/>
        <TheSpinStyle/>
        <TheFormStyle/>
        <TheChatStyle/>
        <TheChat>
          <TheChat.TimeLine style={{
            height: '300px',
            border: '4px solid #333'
          }}
                            items={items}
                            onWho={(who) => console.log('who selected', who)}
                            onScrollReachTop={() => console.log('reached to top')}
                            onScrollReachBottom={() => console.log('reached to bottom')}
          />
          <TheChat.Form onUpdate={(form) => this.setState({ form })}
                        values={this.state.form}
                        onSubmit={() => this.setState({
                          form: {},
                          items: [...this.state.items, {
                            at: new Date(),
                            text: this.state.form.text,
                            align: 'right',
                            who: {
                              name: 'Me',
                              color: '#33A'
                            }
                          }]
                        })}
          />
        </TheChat>

        <hr/>

        <TheChat>
          <TheChat.TimeLine alt='Not chat yet'
                            empty={true}
          />
        </TheChat>
      </div>

    )
  }

  componentDidMount () {
    this._timer = setInterval(() => {
      const { items } = this.state
      if (window.DISABLE_THE_CHAT_PUSH) {
        return
      }
      this.setState({
        items: [...items, {
          at: new Date(),
          text: 'Say hoo!',
          align: this.state.items.length % 2 ? 'left' : 'right',
          who: {
            name: 'hoge',
            initial: 'H'
          }
        }]
      })
      console.log('item added')
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this._timer)
  }
}

export default ExampleComponent
