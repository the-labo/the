'use strict'

import React from 'react'
import { TheDialog, TheOkDialog, TheYesNoDialog, TheConfirmDialog, TheDialogStyle } from '@the-/ui-dialog'
import { TheButton, TheButtonStyle } from '@the-/button'
import { TheSpinStyle } from '@the-/spin'
import { TheInputStyle } from '@the-/input'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dialog: false,
      dialogSpinning: false,
      yesNoDialog: false,
      okDialog: false,
      confirmDialog: false,
      confirmSpinning: false
    }
  }

  render () {
    const {state} = this
    return (
      <div>
        <TheInputStyle/>
        <TheButtonStyle/>
        <TheSpinStyle/>
        <div style={{textAlign: 'center', padding: 8}}>
          <TheButton onClick={() => {
            this.toggleDialog(true)
            this.setState({dialogSpinning: true})
            setTimeout(() => this.setState({dialogSpinning: false}), 800)
          }}>Show dialog</TheButton>
          <TheButton onClick={() => this.toggleOkDialog(true)}>Show ok dialog</TheButton>
          <TheButton onClick={() => this.toggleYesNoDialog(true)}>Show yes-no dialog</TheButton>
          <TheButton onClick={() => this.toggleConfirmDialog(true)}>Show confirm dialog</TheButton>
        </div>
        <TheDialogStyle/>
        <TheDialog present={state.dialog}
                   onClose={() => this.toggleDialog(false)}
                   title='Hey'
                   lead='This is a lead'
                   spinning={state.dialogSpinning}
        >
          <div>
            Scroll me!
            <div style={{height: 600}}/>
            There you are.
          </div>
        </TheDialog>

        <TheOkDialog present={state.okDialog}
                     onClose={() => this.toggleOkDialog(false)}
                     zIndex={124}
                     lead='This is some result'
        />
        <TheYesNoDialog present={state.yesNoDialog}
                        onClose={() => this.toggleYesNoDialog(false)}
                        onYes={() => this.toggleYesNoDialog(false)}
                        onNo={() => this.toggleYesNoDialog(false)}
                        icon={'fas fa-car'}
                        title='Hey'>
          <div>
            Scroll me!
            <div style={{height: 600}}></div>
            There you are.
          </div>
        </TheYesNoDialog>

        <TheConfirmDialog present={state.confirmDialog}
                          spinning={state.confirmSpinning}
                          title='A Confirm Dialog'
                          onClose={() => this.toggleConfirmDialog(false)}
                          onSubmit={() => {
                            this.toggleConfirmSpinning(true)
                            setTimeout(() => {
                              this.toggleConfirmDialog(false)
                              this.toggleConfirmSpinning(false)
                            }, 2000)
                          }}
        >
          Do something danger!
        </TheConfirmDialog>
      </div>
    )
  }

  toggleDialog (enabled) {
    const s = this
    s.setState({
      dialog: enabled
    })
  }

  toggleYesNoDialog (enabled) {
    const s = this
    s.setState({
      yesNoDialog: enabled
    })
  }

  toggleOkDialog (enabled) {
    const s = this
    s.setState({
      okDialog: enabled
    })
  }

  toggleConfirmDialog (enabled) {
    const s = this
    s.setState({
      confirmDialog: enabled
    })
  }

  toggleConfirmSpinning (enabled) {
    const s = this
    s.setState({
      confirmSpinning: enabled
    })
  }
}

export default ExampleComponent
