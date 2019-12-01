'use strict'

import React, { useCallback, useState } from 'react'
import { TheButton } from '@the-/ui-button'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheForm, TheFormBinder } from '@the-/ui-form'
import { TheFormStyle } from '@the-/ui-form/styles'
import { TheInput } from '@the-/ui-input'
import { TheInputStyle } from '@the-/ui-input/styles'

const ExampleComponent = () => {
  const [values, setValues] = useState({})

  const onUpdate = useCallback(
    (newValues) => {
      setValues(Object.assign({}, values, newValues))
    },
    [values, setValues],
  )

  const { Field, FieldSet, Label, Legend, Value } = TheForm
  return (
    <div>
      <TheFormStyle />
      <TheInputStyle />
      <TheButtonStyle />

      <div>
        <TheFormBinder onUpdate={onUpdate} values={values}>
          {({ inputPropsOf, labelPropsOf }) => (
            <TheForm>
              <Field>
                <Label {...labelPropsOf('value01')}>Foo</Label>
                <Value>
                  <TheInput.Text
                    {...inputPropsOf('value01')}
                    candidate={['foo', 'bar']}
                  />
                </Value>
              </Field>
              <Field>
                <Label {...labelPropsOf('value02')}>Bar</Label>
                <Value>
                  <TheInput.Radio
                    {...inputPropsOf('value02')}
                    options={{ '01': 'ORange', '02': 'Banana' }}
                  />
                </Value>
              </Field>

              <FieldSet>
                <Legend>This is legend</Legend>
                <Field>
                  <Label {...labelPropsOf('value01')}>Foo</Label>
                  <Value>
                    <TheInput.Text
                      {...inputPropsOf('value01')}
                      candidate={['foo', 'bar']}
                    />
                  </Value>
                </Field>
              </FieldSet>
            </TheForm>
          )}
        </TheFormBinder>
        <hr />

        <TheForm spinning>
          <Field>
            <Label>Foo</Label>
            <Value>
              <TheInput.Text
                name='value01'
                onUpdate={onUpdate}
                value={values.value01}
              />
            </Value>
          </Field>
          <Field>
            <Label>Bar</Label>
            <Value>
              <TheInput.Radio
                name='value02'
                onUpdate={onUpdate}
                options={{ '01': 'ORange', '02': 'Banana' }}
                value={values.value02}
              />
            </Value>
          </Field>
        </TheForm>

        <hr />
        <TheForm
          errorLead='You have an input error'
          errors={{ value01: 'no,no,no' }}
        >
          <Field>
            <Label>Foo</Label>
            <Value>
              <TheInput.Text
                name='value01'
                onUpdate={onUpdate}
                value={values.value01}
              />
            </Value>
          </Field>
        </TheForm>
      </div>
      <hr />

      <div>
        <TheForm inline>
          <TheInput.Text
            name='value01'
            onUpdate={onUpdate}
            value={values.value01}
          />
          <TheButton primary>Do it!</TheButton>
        </TheForm>

        <TheForm inline>
          <TheInput.Text
            error='This is error'
            name='value01'
            onUpdate={onUpdate}
            value={values.value01}
          />
          <TheButton primary>Do it!</TheButton>
        </TheForm>
      </div>
    </div>
  )
}

export default ExampleComponent
