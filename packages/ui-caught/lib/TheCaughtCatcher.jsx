'use strict'

import React from 'react'
import TheCaught from './TheCaught'

class TheCaughtCatcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidCatch(error, info) {
    const {
      props: { title },
    } = this
    const caughtError = {
      message: [title, error.message || error].join(' - '),
      stack: error.stack,
    }
    this.setState({
      caught: {
        error: caughtError,
        info,
      },
    })
  }

  render() {
    const {
      props: { children },
      state: { caught },
    } = this
    if (!caught) {
      return children
    }

    const { error, info } = caught
    return (
      <div className='the-catching-container'>
        <TheCaught error={error} info={info} />
      </div>
    )
  }
}

TheCaughtCatcher.defaultProps = {
  title: 'Something is Wrong',
}

export default TheCaughtCatcher
