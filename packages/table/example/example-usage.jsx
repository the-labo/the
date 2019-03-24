'use strict'

import React from 'react'
import { TheTable, TheTableStyle } from 'the-table'
import { TheInputStyle } from 'the-input'

const { Head, Body, Row, Cell, HeaderCell, CheckboxCell } = TheTable

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      row0: false,
      row1: false
    }
  }

  render () {
    const s = this
    const { state } = s
    return (
      <div>
        <TheTableStyle/>
        <TheInputStyle/>
        <TheTable>
          <Head>
            <Row>
              <HeaderCell
              />
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Number</HeaderCell>
              <HeaderCell></HeaderCell>
            </Row>
          </Head>
          <Body>
          <Row selected={state.row0}>
            <CheckboxCell value={state.row0}
                          name='row0'
                          onUpdate={(v) => s.setState(v)}
            >foo</CheckboxCell>
            <Cell>foo</Cell>
            <Cell>1234</Cell>
            <Cell/>
          </Row>

          <Row selected={state.row1}>
            <CheckboxCell value={state.row1}
                          name='row1'
                          onUpdate={(v) => s.setState(v)}
            >foo</CheckboxCell>
            <Cell>foo</Cell>
            <Cell>1234</Cell>
            <Cell/>
          </Row>
          </Body>
        </TheTable>

        <hr/>

        <TheTable empty
                  alt="This is an empty table!"
        />
      </div>

    )
  }
}

export default ExampleComponent
