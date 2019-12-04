'use strict'

import '@the-/polyfill/apply' // Some browser needs polyfill for ImageCapture API
import React, { useState } from 'react'
import { TheCam, TheCamInput } from '@the-/ui-cam'
import { TheCamStyle } from '@the-/ui-cam/styles'
import { TheSpinStyle } from '@the-/ui-spin/styles'

const ExampleComponent = () => {
  const [disabled, setDisabled] = useState(false)
  const [photo01, setPhoto01] = useState(null)
  const start = () => {
    setDisabled(false)
  }

  const stop = () => {
    setDisabled(true)
  }

  return (
    <div>
      <TheCamStyle />
      <TheSpinStyle />
      <TheCam
        disabled={disabled}
        onStart={() => console.log('camera started')}
        onStop={() => console.log('camera stopped')}
      />

      <br />
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>

      <br />
      <hr />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section>
        <h1>As Input</h1>
        <TheCamInput
          name='photo01'
          onUpdate={({ photo01 }) => setPhoto01(photo01)}
          value={photo01}
        />
      </section>
    </div>
  )
}

export default ExampleComponent
