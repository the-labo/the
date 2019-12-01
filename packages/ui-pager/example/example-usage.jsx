'use strict'

import React, { useState } from 'react'
import { ThePager } from '@the-/ui-pager'
import { ThePagerStyle } from '@the-/ui-pager/styles'

const ExampleComponent = () => {
  const [page, setPage] = useState(2)
  return (
    <div>
      <ThePagerStyle />
      <ThePager.Row>
        <ThePager
          onChange={(e) => setPage(e.page)}
          page={page}
          size={3}
          total={8}
        />
        <ThePager.Counts counts={{ limit: 25, offset: 25, total: 52 }} />
      </ThePager.Row>

      <hr />

      <ThePager hrefPattern='?page=:page' page={page} size={5} total={15} />
    </div>
  )
}

export default ExampleComponent
