'use strict'

import React from 'react'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheAccordionSection, TheSection } from '@the-/ui-section'
import { TheSectionStyle } from '@the-/ui-section/styles'
import { TheSpinStyle } from '@the-/ui-spin/styles'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <TheSectionStyle />
        <TheButtonStyle />
        <TheSpinStyle />

        <h3>Normal section</h3>
        <TheSection>
          <TheSection.Header>This is header</TheSection.Header>
          <TheSection.Body>This is content</TheSection.Body>
        </TheSection>

        <br />

        <h3>Lined header section</h3>
        <TheSection>
          <TheSection.Header
            actionIcon='fa fa-pencil'
            actionText='edit'
            lined
            onAction={() => console.log('Edit button pressed')}
          >
            This is lined header
          </TheSection.Header>
          <TheSection.Body>This is content</TheSection.Body>
        </TheSection>

        <h3>Spinning section</h3>
        <TheSection spinning>
          <TheSection.Header lined>This is lined header</TheSection.Header>
          <TheSection.Body>This is content</TheSection.Body>
        </TheSection>

        <br />

        <TheAccordionSection
          heading='Try me!'
          onToggle={() => console.log('accordion toggle')}
        >
          <p>This is the accordion body</p>
        </TheAccordionSection>

        <TheAccordionSection
          heading='Try me2!'
          onToggle={() => console.log('accordion toggle')}
          open
        >
          <p>This is the accordion body</p>
        </TheAccordionSection>
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default ExampleComponent
