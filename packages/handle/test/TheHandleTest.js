/**
 * Test for TheHandle.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const { TheScene } = require('the-scene-base')
const TheHandle = require('../lib/TheHandle')

describe('the-handle', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheHandle)
    const handle = new TheHandle({
      attributes: {
        l: () => 'l',
      },
    })

    class MyScene extends TheScene {
      get doNotCallMe() {
        throw new Error('Do not call me')
      }

      hey() {
        return this.l() + 'hey'
      }
    }

    class MyScene2 extends TheScene {}

    handle.load(MyScene, 'foo')
    handle.load(MyScene, 'foo', 'bar')

    ok(handle.foo)
    ok(handle.foo.bar)
    const { bar } = handle.foo
    equal(bar.hey(), 'lhey')
    equal(handle['foo.bar.hey'](), 'lhey')

    handle.setAttributes({ store: 'This is store!' })
    equal(handle.store, 'This is store!')
    equal(bar.store, 'This is store!')

    const baz = handle.load(MyScene, 'baz')
    equal(baz.store, 'This is store!')

    handle.loadFromMapping({
      inner: {
        m2: MyScene2,
      },
      m1: MyScene,
    })

    ok(handle.inner.m2)
  })

  it('init all', () => {
    const handle = new TheHandle({})
    let initialized = {}

    class MyScene extends TheScene {
      get scope() {
        return { name: 'STR' }
      }

      init() {
        initialized.scene1 = true
      }
    }

    class MyScene2 extends TheScene {
      get scope() {
        return { name: 'STR' }
      }

      init() {
        initialized.scene2 = true
      }
    }

    handle.loadFromMapping({
      myScene: MyScene,
      myScene2: MyScene2,
    })
    handle.initAll()
    equal(handle.myScene.props.name, 'myScene')
    ok(initialized.scene1)
    ok(initialized.scene2)
  })
})

/* global describe, before, after, it */
