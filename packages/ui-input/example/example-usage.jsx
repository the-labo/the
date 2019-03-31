'use strict'

import React from 'react'
import { TheInput, TheInputStyle } from '@the-/ui-input'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      values: {}
    }
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate (values) {
    console.log('values', values)
    this.setState({
      values: Object.assign({}, this.state.values, values)
    })
  }

  render () {
    const { values } = this.state
    const { onUpdate } = this

    const {
      Text,
      Password,
      Search,
      Number,
      TextArea,
      Radio,
      Checkbox,
      Select,
      Toggle,
      PinCode,
      Slider,
      Range,
      Upload,
      Date,
      Tag
    } = TheInput
    return (
      <div>
        <TheInputStyle/>
        <TheSpinStyle/>

        <h3>Text</h3>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='value01'
              options={['Banana', 'Orange', 'Apple']}
        />

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              parser={(v) => String(v).toUpperCase()}
              placeholder='value01 only with uppercase parser'
              autoCapitalize={false}
              selectWhenFocused
              autoCorrect="off"
              options={['Banana', 'Orange', 'Apple']}
        />

        <Text name='value01'
              value={values['value01']}
              prefix={'Oh!'}
              suffix={', Yes it is!'}
              onUpdate={onUpdate}
              placeholder='value01'
              options={['Banana', 'Orange', 'Apple']}
        />

        <h3>Text with hint</h3>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='eg: hoge@example.com'
              pattern={Text.EMAIL_PATTERN}
              patternHint='Needs to be email'
        />

        <h3>Select on focus</h3>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='Select on focus'
              selectOnFocus
        />

        <br/>

        <h3>Search</h3>
        <Search name='value01'
                value={values['value01']}
                onUpdate={onUpdate}
                placeholder='value01'
        />


        <br/>

        <h3>Password</h3>
        <Password name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
        />

        <br/>

        <h3>Text Area</h3>
        <TextArea name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  onCombineEnter={() => console.log('combine enter')}
                  onEnter={() => console.log('enter')}
                  placeholder='value01'
        />

        <TextArea name='value01'
                  autoExpand
                  minRows={1}
                  maxRows={8}
                  value={values['value01']}
                  onUpdate={onUpdate}
                  onCombineEnter={() => console.log('combine enter')}
                  onEnter={() => console.log('enter')}
                  placeholder='auto expand'
        />

        <TextArea name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01 readonly'
                  readOnly
        />


        <hr/>

        <h3>Radio</h3>

        <div>
          <Radio name='value02'
                 value={values['value02']}
                 onUpdate={onUpdate}
                 options={['Car', 'Ship', 'Plane']}
          />
        </div>

        <div>

          <Radio name='value02'
                 value={values['value02']}
                 onUpdate={onUpdate}
                 options={['Car', 'Ship', 'Plane']}
                 asButton
          />

        </div>

        <div>

          <Radio name='value02'
                 value={values['value02']}
                 onUpdate={onUpdate}
                 options={['Car', 'Ship', 'Plane']}
                 asToggle
          />

        </div>

        <hr/>

        <h3>Checkbox</h3>

        <div>
          <Checkbox name='value03'
                    value={values['value03']}
                    onUpdate={onUpdate}
                    options={['Green', 'Pink', 'Brown']}
          />
        </div>

        <div>
          <Checkbox name='value03'
                    asButton
                    value={values['value03']}
                    onUpdate={onUpdate}
                    options={['Green', 'Pink', 'Brown']}
          />
        </div>

        <hr/>
        <h3>Select</h3>

        <div>
          <Select name='value04'
                  placeholder='Any drink?'
                  nullable
                  value={values['value04']}
                  onUpdate={onUpdate}
                  sorter={(a, b) => a.localeCompare(b)}
                  disabledValues={['Coffee']}
                  options={['Tea', 'Coffee', 'Water', ...'abcdefghijlkmnlopqrstu'.split('')]}
          />


          <Select name='value04'
                  value={values['value04']}
                  placeholder='Full screen select'
                  onUpdate={onUpdate}
                  fullScreen
                  nullable
                  disabledValues={['Coffee']}
                  options={['Tea', 'Coffee', 'Water', ...new Array(100).fill(null).map((_, i) => `option-${i}`)]}
          />

          <Select.WithOptionsArray name='value04'
                                   value={values['value04']}
                                   onUpdate={onUpdate}
                                   optionsArray={[
                                     ['Tea', 'This is Tea!'],
                                     ['Water', 'This is Water!'],
                                   ]}
          />
        </div>

        <hr/>
        <h3>Toggle</h3>

        <div>
          <Toggle name='value05'
                  on={Boolean(values['value05'])}
                  onUpdate={onUpdate}
          />
        </div>

        <div>
          <Toggle name='value05'
                  on={Boolean(values['value05'])}
                  onTitle='This is on'
                  offTitle='This is off'
                  onUpdate={onUpdate}
          />
        </div>

        <hr/>
        <h3>Slider</h3>

        <div>
          <Slider name='value06'
                  value={values['value06'] || 10}
                  min={0}
                  max={100}
                  step={1}
                  onUpdate={onUpdate}
          />
        </div>

        <hr/>
        <h3>Range</h3>

        <div>
          <Range name='value07'
                 value={values['value07'] || [10, 80]}
                 min={0}
                 max={100}
                 step={1}
                 onUpdate={onUpdate}
          />
        </div>

        <hr/>
        <h3>Upload</h3>

        <div>
          <Upload name='value08'
                  value={values['value08']}
                  multiple={true}
                  onUpdate={onUpdate}
          />
        </div>


        <hr/>
        <h3>Tag</h3>

        <Tag name='value01'
             value={values['value01']}
             onUpdate={onUpdate}
             placeholder='value01'
             options={['Banana', 'Orange', 'Apple']}
        />

        <hr/>


        <h3>Date</h3>
        <Date name='value-date-01'
              value={values['value-date-01']}
              minDate={'2018-03-09'}
              placeholder={'date only'}
              onUpdate={onUpdate}
        />

        <Date name='value-date-01'
              value={values['value-date-01']}
              placeholder={'date and time'}
              timeEnabled
              minDate={'2018-03-09'}
              onUpdate={onUpdate}
        />

        <Date name='value-date-01-time'
              value={values['value-date-01-time']}
              placeholder={'time only'}
              noCalendar
              dateFormat={'H:i'}
              timeEnabled
              minDate={'2018-03-09'}
              onUpdate={onUpdate}
        />

        <br/>


        <h3>PinCode</h3>
        <PinCode name='value-pin-code-01'
                 value={values['value-pin-code-01']}
                 onUpdate={onUpdate}
        />

        <br/>

        <h3>Number</h3>
        <Number name='value-number-01'
                value={values['value-number-01']}
                min={-2}
                max={100}
                onUpdate={onUpdate}
        />

        <Number name='value-number-01'
                value={values['value-number-01']}
                placeholder={'number without min/max'}
                onUpdate={onUpdate}
        />

        <br/>
        <br/>

        <hr/>

        <h2>Error</h2>

        <TheInput name='@'
                  type='hidden'
                  error='This is global error'/>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              placeholder='value01'
              options={['Banana', 'Orange', 'Apple']}
              error='Something Wrong with This!'
        />


        <Password name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
                  error='Something Wrong with This!'
        />

        <TextArea name='value01'
                  value={values['value01']}
                  onUpdate={onUpdate}
                  placeholder='value01'
                  error='Something Wrong with This!'
                  onKeyDown={(e) => console.log('key down', e.keyCode)}
        />

        <Select name='value04'
                value={values['value04']}
                onUpdate={onUpdate}
                options={['Tea', 'Coffee', 'Water']}
                error='Something Wrong with This!'
        />

        <Select name='value04'
                spinning
                value={values['value04']}
                onUpdate={onUpdate}
                options={['Tea', 'Coffee', 'Water']}
                error='Something Wrong with This!'
        />

        <Radio name='value02'
               value={values['value02']}
               onUpdate={onUpdate}
               options={['Car', 'Ship', 'Plane']}
               error='Something Wrong with This!'
        />
        <Checkbox name='value03'
                  value={values['value03']}
                  onUpdate={onUpdate}
                  options={['Green', 'Pink', 'Brown']}
                  disabledValues={['Pink']}
                  error='Something Wrong with This!'
        />

        <Upload name='value08'
                value={values['value08']}
                multiple={true}
                error='Something Wrong with This!'
                onUpdate={onUpdate}
        />


        <br/>
        <br/>
        <br/>

        <hr/>

        <h2>Readonly</h2>

        <Text name='value01'
              value={values['value01']}
              onUpdate={onUpdate}
              readOnly
              placeholder='value01'
        />

        <Select name='value04'
                value={values['value04']}
                onUpdate={onUpdate}
                options={['Tea', 'Coffee', 'Water']}
                readOnly
        />

        <Radio name='value02'
               value={values['value02']}
               onUpdate={onUpdate}
               options={['Car', 'Ship', 'Plane']}
               readOnly
        />
        <Checkbox name='value03'
                  value={values['value03']}
                  onUpdate={onUpdate}
                  options={['Green', 'Pink', 'Brown']}
                  readOnly
        />

        <Upload name='value08'
                value={values['value08']}
                multiple={true}
                readOnly
                onUpdate={onUpdate}
        />
      </div>

    )
  }
}

export default ExampleComponent
