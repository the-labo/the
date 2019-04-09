'use strict'

import React from 'react'
import { TheQr, TheQrStyle } from '@the-/ui-qr'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheSpinStyle/>
        <TheQrStyle/>
        <TheQr text={null}></TheQr>

        <TheQr text={'Some URL'}
               onError={ (err) => console.error('Failed with error:', err)}
               onGenerate={ (url) => console.log('Image generated:', url)}
        ></TheQr>

        <br/>

        <TheQr text={'Some URL as Link'}
               onError={ (err) => console.error('Failed with error:', err)}
               onGenerate={ (url) => console.log('Image generated:', url)}
               asLink
        ></TheQr>

        <TheQr text={'With display size'}
               displaySize={24}
               onError={ (err) => console.error('Failed with error:', err)}
               onGenerate={ (url) => console.log('Image generated:', url)}
               asLink
        ></TheQr>
      </div>

    )
  }
}

export default ExampleComponent
