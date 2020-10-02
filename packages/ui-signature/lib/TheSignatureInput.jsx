'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import TheSignature from './TheSignature'

const noop = () => null

const TheSignatureInput = (props) => {
  const { className, error, name, onEnd, onUpdate, value } = props

  useEffect(() => {
    console.log('name')
  }, [name])
  useEffect(() => {
    console.log('onEnd')
  }, [onEnd])
  useEffect(() => {
    console.log('onUpdate')
  }, [onUpdate])

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
    <TheSignature
      {...props}
      className={c(className, { 'the-signature-error': !!error })}
      onEnd={handleEnd}
    >
      {error && <span className='the-signature-error-message'>{error}</span>}
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
