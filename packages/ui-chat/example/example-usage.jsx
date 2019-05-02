'use strict'

import React from 'react'
import { TheButtonStyle } from '@the-/ui-button'
import { TheChat, TheChatStyle } from '@the-/ui-chat'
import { TheFormStyle } from '@the-/ui-form'
import { TheImageStyle } from '@the-/ui-image'
import { TheInputStyle } from '@the-/ui-input'
import { TheSpinStyle } from '@the-/ui-spin'
import { TheVideoStyle } from '@the-/ui-video'

const images = [
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/01.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/02.jpg',
  'https://raw.githubusercontent.com/apeman-asset-labo/apeman-asset-images/master/dist/dummy/03.jpg',
]

const videos = ['./mov_bbb.mp4']

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this._timer = null
    this.state = {
      form: {},
      items: [
        {
          at: new Date('2017/10/01 12:34'),
          text: 'This is the first post from John',
          who: {
            image: images[0],
            name: 'John',
          },
        },
        {
          at: new Date('2017/10/02 12:34'),
          text: 'This is the second post from John',
          who: {
            image: images[0],
            name: 'John',
          },
        },
        {
          at: new Date('2017/10/03 12:34'),
          node: <span>This is the third post from John</span>,
          who: {
            image: images[0],
            name: 'John',
          },
        },
        {
          at: new Date('2017/10/08 12:38'),
          video: videos[0],
          who: {
            image: images[1],
            name: 'John The Video',
          },
        },
        {
          align: 'right',
          at: new Date('2017/10/08 14:38'),
          image: images[2],
          status: 'Read',
          text: `This is an text\n hoge fuge fuge`,
          who: {
            name: 'hoge',
          },
        },
        {
          at: new Date('2017/10/08 14:44'),
          node: <h3>this is some raw data</h3>,
          raw: true,
        },
        {
          align: 'right',
          at: new Date('2017/10/08 14:38'),
          image: images[2],
          who: {
            image: images[0],
            name: 'hoge',
          },
        },
      ],
    }
  }

  componentDidMount() {
    this._timer = setInterval(() => {
      const { items } = this.state
      if (window.DISABLE_THE_CHAT_PUSH) {
        return
      }
      this.setState({
        items: [
          ...items,
          {
            align: this.state.items.length % 2 ? 'left' : 'right',
            at: new Date(),
            text: 'Say hoo!',
            who: {
              initial: 'H',
              name: 'hoge',
            },
          },
        ],
      })
      console.log('item added')
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }

  render() {
    const { items } = this.state
    return (
      <div>
        <TheVideoStyle />
        <TheButtonStyle />
        <TheInputStyle />
        <TheImageStyle />
        <TheSpinStyle />
        <TheFormStyle />
        <TheChatStyle />
        <TheChat>
          <TheChat.TimeLine
            items={items}
            onScrollReachBottom={() => console.log('reached to bottom')}
            onScrollReachTop={() => console.log('reached to top')}
            onWho={(who) => console.log('who selected', who)}
            style={{
              border: '4px solid #333',
              height: '300px',
            }}
          />
          <TheChat.Form
            onSubmit={() =>
              this.setState({
                form: {},
                items: [
                  ...this.state.items,
                  {
                    align: 'right',
                    at: new Date(),
                    text: this.state.form.text,
                    who: {
                      color: '#33A',
                      name: 'Me',
                    },
                  },
                ],
              })
            }
            onUpdate={(form) => this.setState({ form })}
            values={this.state.form}
          />
        </TheChat>

        <hr />

        <TheChat>
          <TheChat.TimeLine alt='Not chat yet' empty={true} />
        </TheChat>
      </div>
    )
  }
}

export default ExampleComponent
