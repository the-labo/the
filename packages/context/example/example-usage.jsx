'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const { TheContext } = require('@the-/context')

async function tryExample() {
  const l = {
    en: {
      TRY_ME_BUTTON: 'Try Me!',
      HELLO_MESSAGE: 'Hello!',
    },
  }
  const context = new TheContext({
    l,
    toast: {
      message: null,
      showMessage(message) {
        const toast = this.get('toast')
        this.set({ toast: { ...toast, message } })
      },
    },
  })

  class Button extends React.Component {
    #init = ({ l, toast }) => ({
      l,
      onClick: () => {
        toast.showMessage(l.en.HELLO_MESSAGE)
      },
    })

    render() {
      return (
        <context.Entry init={this.#init}>
          {({ onClick, l }) => <a onClick={onClick}>{l.en.TRY_ME_BUTTON}</a>}
        </context.Entry>
      )
    }
  }

  class Toast extends React.Component {
    #pipe = ({ toast: { message } }) => ({
      message,
    })

    render() {
      return (
        <context.Entry pipe={this.#pipe}>
          {({ message }) => <span className='toast'>{message}</span>}
        </context.Entry>
      )
    }
  }

  class App extends React.Component {
    render() {
      return (
        <context.Root>
          <Toast />
          <Button />
        </context.Root>
      )
    }
  }

  ReactDOM.render(<App />, '#app-container')
}

tryExample().catch((err) => console.error(err))
