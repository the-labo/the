'use strict'

import React from 'react'
import { TheSection, TheAccordionSection, TheSectionStyle } from 'the-section'
import { TheSpinStyle } from 'the-spin'
import { TheButtonStyle } from 'the-button'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheSectionStyle/>
        <TheButtonStyle/>
        <TheSpinStyle/>

        <h3>Normal section</h3>
        <TheSection>
          <TheSection.Header>This is header</TheSection.Header>
          <TheSection.Body>This is content</TheSection.Body>
        </TheSection>

        <br/>

        <h3>Lined header section</h3>
        <TheSection>
          <TheSection.Header lined
                             actionText='edit'
                             actionIcon='fa fa-pencil'
                             onAction={() => console.log('Edit button pressed')}
          >This is lined header</TheSection.Header>
          <TheSection.Body>This is content</TheSection.Body>
        </TheSection>

        <h3>Spinning section</h3>
        <TheSection spinning>
          <TheSection.Header lined>This is lined header</TheSection.Header>
          <TheSection.Body>This is content</TheSection.Body>
        </TheSection>

        <br/>

        <TheAccordionSection heading='Try me!'>
          <p>
            This is the accordion body
          </p>
        </TheAccordionSection>
        <br/>
        <br/>
        <br/>
      </div>

    )
  }
}

export default ExampleComponent
