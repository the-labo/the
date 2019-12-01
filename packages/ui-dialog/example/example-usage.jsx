'use strict'

import React, { useState } from 'react'
import { TheButton } from '@the-/ui-button'
import { TheButtonStyle } from '@the-/ui-button/styles'
import {
  TheConfirmDialog,
  TheDialog,
  TheOkDialog,
  TheYesNoDialog,
} from '@the-/ui-dialog'
import { TheDialogStyle } from '@the-/ui-dialog/styles'
import { TheInputStyle } from '@the-/ui-input/styles'
import { TheSpinStyle } from '@the-/ui-spin/styles'

const ExampleComponent = () => {
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [confirmSpinning, setConfirmSpinning] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [dialogSpinning, setDialogSpinning] = useState(false)
  const [okDialog, setOkDialog] = useState(false)
  const [yesNoDialog, setYesNoDialog] = useState(false)
  return (
    <div>
      <TheInputStyle />
      <TheButtonStyle />
      <TheSpinStyle />
      <div style={{ padding: 8, textAlign: 'center' }}>
        <TheButton
          onClick={() => {
            setDialog(true)
            setDialogSpinning(true)
            setTimeout(() => setDialogSpinning(false), 800)
          }}
        >
          Show dialog
        </TheButton>
        <TheButton onClick={() => setOkDialog(true)}>Show ok dialog</TheButton>
        <TheButton onClick={() => setYesNoDialog(true)}>
          Show yes-no dialog
        </TheButton>
        <TheButton onClick={() => setConfirmDialog(true)}>
          Show confirm dialog
        </TheButton>
      </div>
      <TheDialogStyle />
      <TheDialog
        lead='This is a lead'
        onClose={() => setDialog(false)}
        present={dialog}
        spinning={dialogSpinning}
        title='Hey'
      >
        <div>
          Scroll me!
          <div style={{ height: 600 }} />
          There you are.
        </div>
      </TheDialog>

      <TheOkDialog
        lead='This is some result'
        onClose={() => setOkDialog(false)}
        present={okDialog}
        zIndex={124}
      />
      <TheYesNoDialog
        icon='fas fa-car'
        onClose={() => setYesNoDialog(false)}
        onNo={() => setYesNoDialog(false)}
        onYes={() => setYesNoDialog(false)}
        present={yesNoDialog}
        title='Hey'
      >
        <div>
          Scroll me!
          <div style={{ height: 600 }} />
          There you are.
        </div>
      </TheYesNoDialog>

      <TheConfirmDialog
        onClose={() => setConfirmDialog(false)}
        onSubmit={() => {
          setConfirmSpinning(true)
          setTimeout(() => {
            setConfirmDialog(false)
            setConfirmSpinning(false)
          }, 2000)
        }}
        present={confirmDialog}
        spinning={confirmSpinning}
        title='A Confirm Dialog'
      >
        Do something danger!
      </TheConfirmDialog>
    </div>
  )
}

export default ExampleComponent
