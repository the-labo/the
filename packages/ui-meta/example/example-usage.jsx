'use strict'

import React from 'react'
import { TheMeta } from '@the-/ui-meta'

class ExampleComponent extends React.Component {
  static ArticlePage({ article, enabled }) {
    if (!enabled) {
      return null
    }
    // Override html title on componentDidMount, restore on componentDidUnmount
    return (
      <div className={'article'}>
        <TheMeta title={article.title} />
        <h3>{article.title}</h3>
        <p>{article.content}</p>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = { number: 0 }
  }

  render() {
    const numbers = [0, 1, 2]
    return (
      <TheMeta.Root title={'TheMeta Example'}>
        <div className={'app'}>
          {numbers.map((number) => (
            <ExampleComponent.ArticlePage
              article={{
                content: `This is the article-${number}!`,
                title: `article-${number}`,
              }}
              enabled={number === this.state.number}
              key={number}
            />
          ))}
          <br />
          <div>
            {numbers.map((number) => (
              <a
                href='javascript:void(0)'
                key={number}
                onClick={() => this.setState({ number })}
                style={{
                  display: 'inline-block',
                  margin: '8px',
                  padding: '4px',
                }}
              >{`Show article-${number}`}</a>
            ))}
          </div>
        </div>
      </TheMeta.Root>
    )
  }
}

export default ExampleComponent
