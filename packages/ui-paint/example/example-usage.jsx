'use strict'

import React, { useState } from 'react'
import { ThePaint } from '@the-/ui-paint'
import { ThePaintStyle } from '@the-/ui-paint/styles'

const ExampleComponent = () => {
  const [drawers, setDrawers] = useState({})
  const [snapshots, setSnapshots] = useState({})
  const [erasing, setErasing] = useState(false)
  const [bold, setBold] = useState(false)
  const [lineColor] = useState('#38E')
  const clear = () => {
    for (const drawer of Object.values(drawers)) {
      drawer.clear()
    }
  }

  const onDrawer = (drawer) => {
    setDrawers({
      ...drawers,
      [drawer.id]: drawer,
    })
  }

  const onDrawStart = ({ drawer, snapshot }) => {
    setDrawers({
      ...drawers,
      [drawer.id]: drawer,
    })
    setSnapshots({
      ...snapshots,
      [drawer.id]: [...(snapshots[drawer.id] || []), snapshot],
    })
    console.log('Drawing started', { drawer, snapshot })
  }

  const onDrawEnd = ({ drawer, snapshot }) => {
    console.log('Drawing ended', { drawer, snapshot })
  }

  const toggleErase = () => {
    setErasing(!erasing)
  }
  const toggleBold = () => {
    setBold(!bold)
  }

  const undo = async () => {
    for (const [drawerId, drawer] of Object.entries(drawers)) {
      const snapshot = (snapshots[drawerId] || []).pop()
      if (!snapshot) {
        drawer.clear()
        continue
      }

      await drawer.fromSnapshot(snapshot)
    }
    setSnapshots({ ...snapshots })
  }
  return (
    <div>
      <ThePaintStyle />
      <section>
        <h3>Free hand write</h3>
        <ThePaint
          erasing={erasing}
          lineColor={lineColor}
          lineWidth={bold ? 12 : 4}
          onDrawEnd={onDrawEnd}
          onDrawer={onDrawer}
          onDrawStart={onDrawStart}
          style={{ background: 'white' }}
          width='100%'
        />
      </section>

      <hr />

      <section>
        <h3>Straight write</h3>
        <ThePaint
          erasing={erasing}
          lineWidth={bold ? 12 : 4}
          method='straight'
          onDrawEnd={onDrawEnd}
          onDrawer={onDrawer}
          onDrawStart={onDrawStart}
          style={{ background: 'white' }}
          width='100%'
        />
        <h3>Straight write with fit resize</h3>
        <ThePaint
          erasing={erasing}
          lineWidth={bold ? 12 : 4}
          method='straight'
          onDrawEnd={onDrawEnd}
          onDrawer={onDrawer}
          onDrawStart={onDrawStart}
          resizePolicy='fit'
          style={{ background: 'white' }}
          width='100%'
        />
      </section>

      <hr />

      <section>
        <h3>Rect write</h3>
        <ThePaint
          erasing={erasing}
          lineWidth={bold ? 12 : 4}
          method='rect'
          onDrawEnd={onDrawEnd}
          onDrawer={onDrawer}
          onDrawStart={onDrawStart}
          style={{ background: 'white' }}
          width='100%'
        />
      </section>

      <hr />

      <section>
        <h3>Circle write</h3>
        <ThePaint
          erasing={erasing}
          lineColor='#38E'
          lineWidth={bold ? 12 : 4}
          method='circle'
          onDrawEnd={onDrawEnd}
          onDrawer={onDrawer}
          onDrawStart={onDrawStart}
          style={{ background: 'white' }}
          width='100%'
        />
      </section>

      <br />

      <hr />
      <section>
        <h3>With Image</h3>
        <ThePaint
          background='data:image/gif;base64,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'
          erasing={erasing}
          lineWidth={bold ? 12 : 4}
          method='straight'
          onDrawEnd={onDrawEnd}
          onDrawer={onDrawer}
          onDrawStart={onDrawStart}
          style={{ background: 'white' }}
          width='100%'
        />
      </section>

      <br />
      <hr />
      <div>
        {`saved: ${Math.max(
          0,
          ...Object.values(snapshots || {}).map(({ length }) => length || 0),
        )}`}
      </div>
      <button onClick={clear}>Clear</button>
      <button onClick={undo}>Undo</button>
      <button onClick={toggleErase}>
        {erasing ? 'Write Mode' : 'Erase Mode'}
      </button>
      <button onClick={toggleBold}>{bold ? 'Thin' : 'Bold'}</button>
    </div>
  )
}

export default ExampleComponent
