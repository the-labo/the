'use strict'

import React from 'react'
import { TheQr, TheQrStyle } from '@the-/ui-qr'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <TheSpinStyle />
        <TheQrStyle />
        <TheQr text={null} />

        <TheQr
          onError={(err) => console.error('Failed with error:', err)}
          onGenerate={(url) => console.log('Image generated:', url)}
          text={'Some URL'}
        />

        <br />

        <TheQr
          asLink
          onError={(err) => console.error('Failed with error:', err)}
          onGenerate={(url) => console.log('Image generated:', url)}
          text={'Some URL as Link'}
        />

        <TheQr
          asLink
          displaySize={24}
          onError={(err) => console.error('Failed with error:', err)}
          onGenerate={(url) => console.log('Image generated:', url)}
          text={'With display size'}
        />
      </div>
    )
  }
}

export default ExampleComponent
