'use strict'

import PropTypes from 'prop-types'
import React from 'react'
import TheSignature from './TheSignature'

const noop = () => null

class TheSignatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnd = this.handleEnd.bind(this)
  }

  handleEnd({ pad }) {
    const { name, onEnd, onUpdate } = this.props

    onEnd && onEnd({ pad })
    onUpdate &&
      onUpdate({
        [name]: pad.toDataURL(),
      })
  }

  render() {
    const { name, value } = this.props
    return (
      <TheSignature {...this.props} onEnd={this.handleEnd}>
        <input name={name} onChange={noop} type='hidden' value={value || ''} />
      </TheSignature>
    )
  }
}

TheSignatureInput.propTypes = {
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  value: PropTypes.string,
}

TheSignatureInput.defaultProps = {
  value: null,
}

export default TheSignatureInput
