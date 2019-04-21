/**
 * App component
 */
'use strict'

import React from 'react'
import { TheCaughtCatcher, TheMain, TheMeta, TheRoot } from '@the-/ui'
import context from './context'
import { Dialogs, Footer, Header, Toasts } from './layouts'
import Routes from './Routes'

class App extends React.Component {
  #stateful = context.stateful(
    (state) => ({
      busy: state['app.busy'],
      pathname: state['app.pathname'],
    }),
    () => ({}),
  )

  render() {
    return (
      <context.Root>
        {this.#stateful(({ busy, l }) => (
          <TheCaughtCatcher>
            <TheMeta.Root title={l('app.APP_NAME')}>
              <TheRoot>
                <Header />
                <Toasts />
                <TheMain spinning={busy}>
                  <Routes />
                </TheMain>
                <Footer />
                <Dialogs />
              </TheRoot>
            </TheMeta.Root>
          </TheCaughtCatcher>
        ))}
      </context.Root>
    )
  }
}

export default App
