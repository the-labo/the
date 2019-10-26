'use strict'

import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import TheSignature from './TheSignature'

const noop = () => null

const TheSignatureInput = (props) => {
  const { name, onEnd, onUpdate, value } = props

  const handleEnd = useCallback(
    ({ pad }) => {
      onEnd && onEnd({ pad })
      onUpdate &&
        onUpdate({
          [name]: pad.toDataURL(),
        })
    },
    [name, onEnd, onUpdate],
  )
  return (
    <TheSignature {...props} onEnd={handleEnd}>
      <input name={name} onChange={noop} type='hidden' value={value || ''} />
    </TheSignature>
  )
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
