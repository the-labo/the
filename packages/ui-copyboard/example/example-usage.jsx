'use strict'

import React from 'react'
import { TheCopyboard, TheCopyboardStyle } from '@the-/ui-copyboard'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheCopyboardStyle/>
        <TheCopyboard text='http://example.com/foo/bar?t=1234qwerasdfzxcv'
                      tipText='Copied to your clip board'
        >
        </TheCopyboard>
      </div>

    )
  }
}

export default ExampleComponent
