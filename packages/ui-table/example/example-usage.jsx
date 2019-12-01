'use strict'

import React from 'react'
import { TheInputStyle } from '@the-/ui-input/styles'
import { TheTable } from '@the-/ui-table'
import { TheTableStyle } from '@the-/ui-table/styles'

const { Body, Cell, CheckboxCell, Head, HeaderCell, Row } = TheTable

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      row0: false,
      row1: false,
    }
  }

  render() {
    const s = this
    const { state } = s
    return (
      <div>
        <TheTableStyle />
        <TheInputStyle />
        <TheTable>
          <Head>
            <Row>
              <HeaderCell />
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Number</HeaderCell>
              <HeaderCell />
            </Row>
          </Head>
          <Body>
            <Row selected={state.row0}>
              <CheckboxCell
                name='row0'
                onUpdate={(v) => s.setState(v)}
                value={state.row0}
              >
                foo
              </CheckboxCell>
              <Cell>foo</Cell>
              <Cell>1234</Cell>
              <Cell />
            </Row>

            <Row selected={state.row1}>
              <CheckboxCell
                name='row1'
                onUpdate={(v) => s.setState(v)}
                value={state.row1}
              >
                foo
              </CheckboxCell>
              <Cell>foo</Cell>
              <Cell>1234</Cell>
              <Cell />
            </Row>
          </Body>
        </TheTable>

        <hr />

        <TheTable alt='This is an empty table!' empty />
      </div>
    )
  }
}

export default ExampleComponent
