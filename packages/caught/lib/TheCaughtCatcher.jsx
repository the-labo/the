'use strict'

import React from 'react'
import TheCaught from './TheCaught'

class TheCaughtCatcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidCatch(error, info) {
    this.setState({
      caught: { error, info },
    })
  }

  render() {
    const { children, title } = this.props
    const { caught } = this.state
    if (!caught) {
      return children
    }
    const { error, info } = caught
    return (
      <div className='the-catching-container'>
        <TheCaught
          error={[title, error.message || error].join(' - ')}
          info={info}
        />
      </div>
    )
  }
}

TheCaughtCatcher.defaultProps = {
  title: 'Something is Wrong',
}

export default TheCaughtCatcher
