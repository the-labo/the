/**
 * AccountProfileForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { UserTypes } from '@self/conf'
import { TheForm, TheInput, withForm } from '@the-/components'
import FBImportButton, { FBImportButtonContainer } from '../fb/FBImportButton'

const { Radio, Text } = TheInput
const { Field, Label, Value } = TheForm

@withForm
@localized
class AccountProfileForm extends React.Component {
  render() {
    const {
      props: {
        getFormAttributes,
        getInputAttributesOf,
        getLabelAttributesOf,
        l,
        onFBSync,
        user,
      },
    } = this
    return (
      <TheForm {...getFormAttributes()} required={['name']}>
        <FBImportButtonContainer>
          <FBImportButton onSync={onFBSync} />
        </FBImportButtonContainer>
        <Field>
          <Label>{l('labels.USER_NAME')}</Label>
          <Value>{user?.name}</Value>
        </Field>
        <Field>
          <Label {...getLabelAttributesOf('email')}>
            {l('labels.USER_EMAIL')}
          </Label>
          <Value>
            <Text
              pattern={Text.EMAIL_PATTERN}
              patternWarning={l('warnings.SEEMS_INVALID_EMAIL')}
              placeholder={l('placeholders.USER_EMAIL')}
              type='email'
              {...getInputAttributesOf('email')}
            />
          </Value>
        </Field>
        <Field>
          <Label {...getLabelAttributesOf('user.type')}>
            {l('labels.USER_TYPE')}
          </Label>
          <Value>
            <Radio
              {...getInputAttributesOf('user.type')}
              options={{
                [UserTypes.JUNIOR]: l('userTypes.JUNIOR'),
                [UserTypes.SENIOR]: l('userTypes.SENIOR'),
              }}
            />
          </Value>
        </Field>
      </TheForm>
    )
  }
}

export default stateful(
  () => ({}),
  ({}, propsProxy) => ({
    onFBSync: (v) => {
      console.log('onFBSync', v)
      propsProxy.onUpdate({})
    },
  }),
)(AccountProfileForm)
