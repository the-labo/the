'use strict'

import React from 'react'
import { TheInput, TheInputStyle } from '@the-/ui-input'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        'value-date-01': '2018-08-01',
      },
    }
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(values) {
    console.log('values', values)
    this.setState({
      values: Object.assign({}, this.state.values, values),
    })
  }

  render() {
    const {
      onUpdate,
      state: { values },
    } = this

    const {
      Checkbox,
      Date,
      Number,
      Password,
      PinCode,
      Radio,
      Range,
      Search,
      Select,
      Slider,
      Tag,
      Text,
      TextArea,
      Toggle,
      Upload,
    } = TheInput
    return (
      <div>
        <TheInputStyle />
        <TheSpinStyle />

        <h3>Text</h3>

        <Text
          name='value01'
          onUpdate={onUpdate}
          options={['Banana', 'Orange', 'Apple']}
          placeholder='value01'
          value={values.value01}
        />

        <Text
          autoCapitalize={false}
          autoCorrect='off'
          name='value01'
          onUpdate={onUpdate}
          options={['Banana', 'Orange', 'Apple']}
          parser={(v) => String(v).toUpperCase()}
          placeholder='value01 only with uppercase parser'
          selectWhenFocused
          value={values.value01}
        />

        <Text
          name='value01'
          onUpdate={onUpdate}
          options={['Banana', 'Orange', 'Apple']}
          placeholder='value01'
          prefix={'Oh!'}
          suffix={', Yes it is!'}
          value={values.value01}
        />

        <h3>Text with hint</h3>

        <Text
          name='value01'
          onUpdate={onUpdate}
          pattern={Text.EMAIL_PATTERN}
          patternHint='Needs to be email'
          placeholder='eg: hoge@example.com'
          value={values.value01}
        />

        <h3>Select on focus</h3>

        <Text
          name='value01'
          onUpdate={onUpdate}
          placeholder='Select on focus'
          selectOnFocus
          value={values.value01}
        />

        <br />

        <h3>Search</h3>
        <Search
          name='value01'
          onUpdate={onUpdate}
          placeholder='value01'
          value={values.value01}
        />

        <br />

        <h3>Password</h3>
        <Password
          name='value01'
          onUpdate={onUpdate}
          placeholder='value01'
          value={values.value01}
        />

        <br />

        <h3>Text Area</h3>
        <TextArea
          name='value01'
          onCombineEnter={() => console.log('combine enter')}
          onEnter={() => console.log('enter')}
          onUpdate={onUpdate}
          placeholder='value01'
          value={values.value01}
        />

        <TextArea
          autoExpand
          maxRows={8}
          minRows={1}
          name='value01'
          onCombineEnter={() => console.log('combine enter')}
          onEnter={() => console.log('enter')}
          onUpdate={onUpdate}
          placeholder='auto expand'
          value={values.value01}
        />

        <TextArea
          name='value01'
          onUpdate={onUpdate}
          placeholder='value01 readonly'
          readOnly
          value={values.value01}
        />

        <hr />

        <h3>Radio</h3>

        <div>
          <Radio
            name='value02'
            onUpdate={onUpdate}
            options={['Car', 'Ship', 'Plane']}
            value={values.value02}
          />
        </div>

        <div>
          <Radio
            asButton
            name='value02'
            onUpdate={onUpdate}
            options={['Car', 'Ship', 'Plane']}
            value={values.value02}
          />
        </div>

        <div>
          <Radio
            asToggle
            name='value02'
            onUpdate={onUpdate}
            options={['Car', 'Ship', 'Plane']}
            value={values.value02}
          />
        </div>

        <hr />

        <h3>Checkbox</h3>

        <div>
          <Checkbox
            name='value03'
            onUpdate={onUpdate}
            options={['Green', 'Pink', 'Brown']}
            value={values.value03}
          />
        </div>

        <div>
          <Checkbox
            asButton
            name='value03'
            onUpdate={onUpdate}
            options={['Green', 'Pink', 'Brown']}
            value={values.value03}
          />
        </div>

        <hr />
        <h3>Select</h3>

        <div>
          <Select
            disabledValues={['Coffee']}
            name='value04'
            nullable
            onUpdate={onUpdate}
            options={[
              'Tea',
              'Coffee',
              'Water',
              ...'abcdefghijlkmnlopqrstu'.split(''),
            ]}
            placeholder='Any drink?'
            sorter={(a, b) => a.localeCompare(b)}
            value={values.value04}
          />

          <Select
            disabledValues={['Coffee']}
            fullScreen
            name='value04'
            nullable
            onUpdate={onUpdate}
            options={[
              'Tea',
              'Coffee',
              'Water',
              ...new Array(100).fill(null).map((_, i) => `option-${i}`),
            ]}
            placeholder='Full screen select'
            value={values.value04}
          />

          <Select.WithOptionsArray
            name='value04'
            onUpdate={onUpdate}
            optionsArray={[
              ['Tea', 'This is Tea!'],
              ['Water', 'This is Water!'],
            ]}
            value={values.value04}
          />
        </div>

        <hr />
        <h3>Toggle</h3>

        <div>
          <Toggle
            name='value05'
            on={Boolean(values.value05)}
            onUpdate={onUpdate}
          />
        </div>

        <div>
          <Toggle
            name='value05'
            offTitle='This is off'
            on={Boolean(values.value05)}
            onTitle='This is on'
            onUpdate={onUpdate}
          />
        </div>

        <hr />
        <h3>Slider</h3>

        <div>
          <Slider
            max={100}
            min={0}
            name='value06'
            onUpdate={onUpdate}
            step={1}
            value={values.value06 || 10}
          />
        </div>

        <hr />
        <h3>Range</h3>

        <div>
          <Range
            max={100}
            min={0}
            name='value07'
            onUpdate={onUpdate}
            step={1}
            value={values.value07 || [10, 80]}
          />
        </div>

        <hr />
        <h3>Upload</h3>

        <div>
          <Upload
            multiple
            name='value08'
            onUpdate={onUpdate}
            value={values.value08}
          />
        </div>

        <hr />
        <h3>Tag</h3>

        <Tag
          name='value01'
          onUpdate={onUpdate}
          options={['Banana', 'Orange', 'Apple']}
          placeholder='value01'
          value={values.value01}
        />

        <hr />

        <h3>Date</h3>
        <Date
          minDate={'2018-03-09'}
          name='value-date-01'
          onUpdate={onUpdate}
          placeholder={'date only'}
          value={values['value-date-01']}
        />

        <Date
          minDate={'2018-03-09'}
          name='value-date-01'
          onUpdate={onUpdate}
          placeholder={'date and time'}
          timeEnabled
          value={values['value-date-01']}
        />

        <Date
          dateFormat={'H:i'}
          minDate={'2018-03-09'}
          name='value-date-01-time'
          noCalendar
          onUpdate={onUpdate}
          placeholder={'time only'}
          timeEnabled
          value={values['value-date-01-time']}
        />

        <br />

        <h3>PinCode</h3>
        <PinCode
          name='value-pin-code-01'
          onUpdate={onUpdate}
          value={values['value-pin-code-01']}
        />

        <br />

        <h3>Number</h3>
        <Number
          max={100}
          min={-2}
          name='value-number-01'
          onUpdate={onUpdate}
          value={values['value-number-01']}
        />

        <Number
          name='value-number-01'
          onUpdate={onUpdate}
          placeholder={'number without min/max'}
          value={values['value-number-01']}
        />

        <br />
        <br />

        <hr />

        <h2>Error</h2>

        <TheInput error='This is global error' name='@' type='hidden' />

        <Text
          error='Something Wrong with This!'
          name='value01'
          onUpdate={onUpdate}
          options={['Banana', 'Orange', 'Apple']}
          placeholder='value01'
          value={values.value01}
        />

        <Password
          error='Something Wrong with This!'
          name='value01'
          onUpdate={onUpdate}
          placeholder='value01'
          value={values.value01}
        />

        <TextArea
          error='Something Wrong with This!'
          name='value01'
          onKeyDown={(e) => console.log('key down', e.keyCode)}
          onUpdate={onUpdate}
          placeholder='value01'
          value={values.value01}
        />

        <Select
          error='Something Wrong with This!'
          name='value04'
          onUpdate={onUpdate}
          options={['Tea', 'Coffee', 'Water']}
          value={values.value04}
        />

        <Select
          error='Something Wrong with This!'
          name='value04'
          onUpdate={onUpdate}
          options={['Tea', 'Coffee', 'Water']}
          spinning
          value={values.value04}
        />

        <Radio
          error='Something Wrong with This!'
          name='value02'
          onUpdate={onUpdate}
          options={['Car', 'Ship', 'Plane']}
          value={values.value02}
        />
        <Checkbox
          disabledValues={['Pink']}
          error='Something Wrong with This!'
          name='value03'
          onUpdate={onUpdate}
          options={['Green', 'Pink', 'Brown']}
          value={values.value03}
        />

        <Upload
          error='Something Wrong with This!'
          multiple
          name='value08'
          onUpdate={onUpdate}
          value={values.value08}
        />

        <br />
        <br />
        <br />

        <hr />

        <h2>Readonly</h2>

        <Text
          name='value01'
          onUpdate={onUpdate}
          placeholder='value01'
          readOnly
          value={values.value01}
        />

        <Select
          name='value04'
          onUpdate={onUpdate}
          options={['Tea', 'Coffee', 'Water']}
          readOnly
          value={values.value04}
        />

        <Radio
          name='value02'
          onUpdate={onUpdate}
          options={['Car', 'Ship', 'Plane']}
          readOnly
          value={values.value02}
        />
        <Checkbox
          name='value03'
          onUpdate={onUpdate}
          options={['Green', 'Pink', 'Brown']}
          readOnly
          value={values.value03}
        />

        <Upload
          multiple
          name='value08'
          onUpdate={onUpdate}
          readOnly
          value={values.value08}
        />
      </div>
    )
  }
}

export default ExampleComponent
