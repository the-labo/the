'use strict'

import { clone } from 'asobj'
import PropTypes from 'prop-types'
import React from 'react'
import theAssert from '@the-/assert'
import { newId } from '@the-/util-ui'

const assert = theAssert('TheFormBinder')
const nullIfUndefined = (v) => (typeof v === 'undefined' ? null : v)

class TheFormBinder extends React.Component {
  constructor(props) {
    super(props)
    this.theID = newId()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.bounds = {
      formPropsOf: this.formPropsOf.bind(this),
      inputPropsOf: this.inputPropsOf.bind(this),
      labelPropsOf: this.labelPropsOf.bind(this),
      submitPropsOf: this.submitPropsOf.bind(this),
    }
  }

  applyRenderer() {
    const { children: renderer } = this.props
    return renderer(this.bounds)
  }

  formPropsOf(name) {
    const { props } = this
    const { errors } = props
    return Object.assign(
      {
        error: nullIfUndefined(errors['*']),
        id: this.idOf('form', name),
        name,
      },
      clone(props, {
        without: [
          'readOnly',
          'onUpdate',
          'onSubmit',
          'required',
          ...Object.keys(this.bounds),
        ],
      }),
    )
  }

  handleSubmit() {
    const { props } = this
    const { onError, onSubmit, required, values } = props
    const missing = []
      .concat(required)
      .filter(Boolean)
      .filter((name) => !values[name])
    if (missing.length > 0) {
      const errors = Object.assign(
        {},
        ...missing.map((name) => ({
          [name]: { missing: true },
        })),
      )
      onError && onError(errors)
      console.error(`[${componentName}] Required fields missing:`, missing)
      return
    }
    onSubmit && onSubmit(values)
  }

  handleUpdate(values) {
    const { props } = this
    const { onUpdate } = props
    onUpdate && onUpdate(values)
  }

  idOf(...names) {
    const { props } = this
    const { id = this.theID } = props
    return [id, ...names].filter(Boolean).join('-')
  }

  /**
   * Get attribute for input
   * @param {string} name - Input name
   * @returns {Object} Attributes for input
   */
  inputPropsOf(name) {
    assert(name, 'name is required')
    const { handleUpdate, props } = this
    const { errors, tabIndex, values } = props
    return {
      error: nullIfUndefined(errors[name]),
      id: this.idOf(name),
      name,
      onUpdate: handleUpdate,
      readOnly: this.readOnlyOf(name),
      required: this.requiredOf(name),
      tabIndex,
      value: nullIfUndefined(values[name]),
    }
  }

  /**
   * Get attribute for label
   * @param {string} name - Input name
   * @returns {Object} Attributes for label
   */
  labelPropsOf(name) {
    assert(name, 'name is required')
    return {
      'data-name': name,
      htmlFor: this.idOf(name),
      required: this.requiredOf(name),
    }
  }

  readOnlyOf(name) {
    const { readOnly } = this.props
    return [].concat(readOnly).includes(name)
  }

  render() {
    return <React.Fragment>{this.applyRenderer()}</React.Fragment>
  }

  requiredOf(name) {
    const { required } = this.props
    return [].concat(required).includes(name)
  }

  submitPropsOf(name = null) {
    const { handleSubmit } = this
    return {
      id: this.idOf('submit', name),
      onSubmit: handleSubmit,
    }
  }
}

TheFormBinder.defaultProps = {
  errors: {},
  readOnly: [],
  required: [],
  values: {},
}
TheFormBinder.propTypes = {
  /** Input errors */
  errors: PropTypes.object,
  /** DOM Id */
  id: PropTypes.string,
  /** Handler for error update */
  onError: PropTypes.func,
  /** Handler for form submit */
  onSubmit: PropTypes.func,
  /** Handler for input update */
  onUpdate: PropTypes.func,
  /** Read only fields */
  readOnly: PropTypes.arrayOf(PropTypes.string),
  /** Required input names */
  required: PropTypes.arrayOf(PropTypes.string),
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Input values */
  values: PropTypes.object,
}

export default TheFormBinder
