'use strict'

import React from 'react'
import { TheButton, TheButtonStyle } from '@the-/ui-button'
import {
  TheConfirmDialog,
  TheDialog,
  TheDialogStyle,
  TheOkDialog,
  TheYesNoDialog,
} from '@the-/ui-dialog'
import { TheInputStyle } from '@the-/ui-input'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      confirmDialog: false,
      confirmSpinning: false,
      dialog: false,
      dialogSpinning: false,
      okDialog: false,
      yesNoDialog: false,
    }
  }

  render() {
    const { state } = this
    return (
      <div>
        <TheInputStyle />
        <TheButtonStyle />
        <TheSpinStyle />
        <div style={{ padding: 8, textAlign: 'center' }}>
          <TheButton
            onClick={() => {
              this.toggleDialog(true)
              this.setState({ dialogSpinning: true })
              setTimeout(() => this.setState({ dialogSpinning: false }), 800)
            }}
          >
            Show dialog
          </TheButton>
          <TheButton onClick={() => this.toggleOkDialog(true)}>
            Show ok dialog
          </TheButton>
          <TheButton onClick={() => this.toggleYesNoDialog(true)}>
            Show yes-no dialog
          </TheButton>
          <TheButton onClick={() => this.toggleConfirmDialog(true)}>
            Show confirm dialog
          </TheButton>
        </div>
        <TheDialogStyle />
        <TheDialog
          lead='This is a lead'
          onClose={() => this.toggleDialog(false)}
          present={state.dialog}
          spinning={state.dialogSpinning}
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
          onClose={() => this.toggleOkDialog(false)}
          present={state.okDialog}
          zIndex={124}
        />
        <TheYesNoDialog
          icon='fas fa-car'
          onClose={() => this.toggleYesNoDialog(false)}
          onNo={() => this.toggleYesNoDialog(false)}
          onYes={() => this.toggleYesNoDialog(false)}
          present={state.yesNoDialog}
          title='Hey'
        >
          <div>
            Scroll me!
            <div style={{ height: 600 }} />
            There you are.
          </div>
        </TheYesNoDialog>

        <TheConfirmDialog
          onClose={() => this.toggleConfirmDialog(false)}
          onSubmit={() => {
            this.toggleConfirmSpinning(true)
            setTimeout(() => {
              this.toggleConfirmDialog(false)
              this.toggleConfirmSpinning(false)
            }, 2000)
          }}
          present={state.confirmDialog}
          spinning={state.confirmSpinning}
          title='A Confirm Dialog'
        >
          Do something danger!
        </TheConfirmDialog>
      </div>
    )
  }

  toggleConfirmDialog(enabled) {
    const s = this
    s.setState({
      confirmDialog: enabled,
    })
  }

  toggleConfirmSpinning(enabled) {
    const s = this
    s.setState({
      confirmSpinning: enabled,
    })
  }

  toggleDialog(enabled) {
    const s = this
    s.setState({
      dialog: enabled,
    })
  }

  toggleOkDialog(enabled) {
    const s = this
    s.setState({
      okDialog: enabled,
    })
  }

  toggleYesNoDialog(enabled) {
    const s = this
    s.setState({
      yesNoDialog: enabled,
    })
  }
}

export default ExampleComponent
