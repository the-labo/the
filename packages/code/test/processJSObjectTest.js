/**
 * Test for processJSObject.
 * Runs with mocha.
 */
/* eslint-disable no-template-curly-in-string */
'use strict'

const {
  strict: { equal },
} = require('assert')
const processJSObject = require('../lib/processors/processJSObject')

describe('process-object-property', async () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSObject('const a = { x: 1, z: 5, y: 2 }'),
      'const a = { x: 1, y: 2, z: 5 }',
    )

    equal(
      await processJSObject('const a = { x: 1, z: 5, y: 2 }'),
      'const a = { x: 1, y: 2, z: 5 }',
    )

    equal(
      await processJSObject(
        'const a = { x: 1, z: 5, y: 2, i: { inner: { n1: 1, n2: () => {} } } }',
      ),
      'const a = { i: { inner: { n1: 1, n2: () => {} } }, x: 1, y: 2, z: 5 }',
    )
  })

  it('Handle spread params', async () => {
    await processJSObject(`const a = {
        x: 1,
        ...{d:4, a:5},
      }`)
  })

  it('Keep spread params', async () => {
    equal(
      await processJSObject(`
      const a = {
        x: 1,
        ...{ d: 4, z: 5 },
        j: 2,
        b: 2,
        ...{ n: 4, a: 5 },
        z: 8,
        n: 0,
      
      }`),
      `
      const a = {
        x: 1,
        ...{ d: 4, z: 5 },
        b: 2,
        j: 2,
        ...{ a: 5, n: 4 },
        n: 0,
        z: 8,
      
      }`,
    )
  })

  it('Destructuring', async () => {
    equal(
      await processJSObject(
        "const { a, j: jj, d, b: { z, nn=5, f }, ...zz } = require('hoge')",
      ),
      "const { a, b: { f, nn=5, z }, d, j: jj, ...zz } = require('hoge')",
    )
  })

  // https://github.com/the-labo/the-code/issues/1
  it('Simple inline Destructuring', async () => {
    equal(
      await processJSObject('const { a } = { a : 1 }'),
      'const { a } = { a : 1 }',
    )
  })

  it('dynamic props', async () => {
    equal(
      await processJSObject(
        "const n = \"NN\";const x = { d: 1, c: 4, 'b': 2, 'a': 8, [n]: 5, _hoge: 1, $$fuge: 2, '3j': 128, 'k k': 1 }",
      ),
      "const n = \"NN\";const x = { $$fuge: 2, [n]: 5, '3j': 128, 'k k': 1, _hoge: 1, a: 8, b: 2, c: 4, d: 1 }",
    )
  })

  it('Function arg', async () => {
    equal(
      await processJSObject(`
    function hoge ({ z, c = 2 }) { /* ... */ }
    `),
      `
    function hoge ({ c = 2, z }) { /* ... */ }
    `,
    )
  })

  it('Inside array', async () => {
    equal(
      await processJSObject(
        'const a = [ { z: 1, a: 3, d: [ { n: 1, b: 8 } ] } ]',
      ),
      'const a = [ { a: 3, d: [ { b: 8, n: 1 } ], z: 1 } ]',
    )
  })

  it('Comment inside inner array', async () => {
    await processJSObject(`
    
    const a = {
  watchDelay: 300,
  ignores: [
    // TODO remove patch
    // ...ExternalIgnorePatch({isProduction}),
  ],
}
`)
  })

  it('optionalChaining', async () => {
    equal(
      await processJSObject("const a = { x: global?.x, b: 'a' }"),
      "const a = { b: 'a', x: global?.x }",
    )
  })

  it('Sort inside line comments', async () => {
    equal(
      await processJSObject(`
        const a = {
          /** z */
          z: 2,
          //----------
          /** y */
          y: 3,
          //----------
          // This is hoge
          //----------
          /** n */
          n: 8,
          b: 5,
        }
      `),
      `
        const a = {
          b: 5,
          //----------
          // This is hoge
          //----------
          /** n */
          n: 8,
          //----------
          /** y */
          y: 3,
          /** z */
          z: 2,
        }
      `,
    )
  })

  it('Dynamic keys', async () => {
    equal(
      await processJSObject(`
      const a = {
          [NativeToWebCallTypes.ALBUM_WILL_SELECT]: async ({ albumId }) => {
          },
          [NativeToWebCallTypes.ALBUM_DID_SELECT]: async ({ albumId }) => {
            await albumDetailScene.show(albumId)
          },
          [NativeToWebCallTypes.CAMERA_WILL_OPEN]: async () => {
            await syncToNativeIfNeeded()
          },
          [NativeToWebCallTypes.CAMERA_DID_OPEN]: async () => {},
          [NativeToWebCallTypes.CAMERA_WILL_CLOSE]: async () => {},
          [NativeToWebCallTypes.CAMERA_DID_CLOSE]: async () => {},
          [NativeToWebCallTypes.MEDIA_DID_SELECT]: async ({ albumId, mediaId } = {}) => {
            await mediaDetailScene.show(albumId, mediaId)
          },
          [NativeToWebCallTypes.MEDIA_DID_UPLOAD]: async ({ albumId, mediaId } = {}) => {
            await albumMediaListScene.doSyncIfHolderIs(albumId)
            await mediaDetailScene.show(albumId, mediaId)
          },
          [NativeToWebCallTypes.MEDIA_WILL_UPLOAD]: async () => {},
          [NativeToWebCallTypes.UPLOADING_LIST_DID_REQUEST]: async () => {},
          [NativeToWebCallTypes.UPLOADING_LIST_VIEW_DID_OPEN]: async () => {},
        }
      `),
      `
      const a = {
          [NativeToWebCallTypes.ALBUM_DID_SELECT]: async ({ albumId }) => {
            await albumDetailScene.show(albumId)
          },
          [NativeToWebCallTypes.ALBUM_WILL_SELECT]: async ({ albumId }) => {
          },
          [NativeToWebCallTypes.CAMERA_DID_CLOSE]: async () => {},
          [NativeToWebCallTypes.CAMERA_DID_OPEN]: async () => {},
          [NativeToWebCallTypes.CAMERA_WILL_CLOSE]: async () => {},
          [NativeToWebCallTypes.CAMERA_WILL_OPEN]: async () => {
            await syncToNativeIfNeeded()
          },
          [NativeToWebCallTypes.MEDIA_DID_SELECT]: async ({ albumId, mediaId } = {}) => {
            await mediaDetailScene.show(albumId, mediaId)
          },
          [NativeToWebCallTypes.MEDIA_DID_UPLOAD]: async ({ albumId, mediaId } = {}) => {
            await albumMediaListScene.doSyncIfHolderIs(albumId)
            await mediaDetailScene.show(albumId, mediaId)
          },
          [NativeToWebCallTypes.MEDIA_WILL_UPLOAD]: async () => {},
          [NativeToWebCallTypes.UPLOADING_LIST_DID_REQUEST]: async () => {},
          [NativeToWebCallTypes.UPLOADING_LIST_VIEW_DID_OPEN]: async () => {},
        }
      `,
    )
  })

  it('Sort props with comments', async () => {
    equal(
      await processJSObject(`
        const X = {
          /** This is b */
          b: () => {},
          c: () => {},
          /** This is a */
          a: () => {},
        }
      `),
      `
        const X = {
          /** This is a */
          a: () => {},
          /** This is b */
          b: () => {},
          c: () => {},
        }
      `,
    )
  })

  it('Sort methods', async () => {
    equal(
      await processJSObject(`
      const x = {
        b () {},
        a () {},
      }
      `),
      `
      const x = {
        a () {},
        b () {},
      }
      `,
    )
  })

  it('With flow', async () => {
    equal(
      await processJSObject(`
    // @flow
    const x = {
      subtract (v1: number, v2:number) : number { 
        return v1 - v2 
      },
      add (v1: number, v2:number) : number {
        return v1 + v2 
      },
    }`),
      `
    // @flow
    const x = {
      add (v1: number, v2:number) : number {
        return v1 + v2 
      },
      subtract (v1: number, v2:number) : number { 
        return v1 - v2 
      },
    }`,
    )
  })

  it('Cleanup redundant alias', async () => {
    equal(
      await processJSObject(`
const { a: a, b: bb, c: c = 1, d: dd = 2} = options
console.log(a, bb, c)
    `),
      `
const { a, b: bb, c = 1, d: dd = 2} = options
console.log(a, bb, c)
    `,
    )
  })

  it('Cleanup redundant alias on assign', async () => {
    equal(
      await processJSObject(`
const x = { a: a, b: bb, c: c, d: dd, 'e': e, [g]: g}
console.log(x)
    `),
      `
const x = { [g]: g, a, b: bb, c, d: dd, e}
console.log(x)
    `,
    )
  })

  it('value with computed', async () => {
    equal(
      await processJSObject(`
const v = value => a ? value : { [value]: value }
const v2 = value2 => a ? value2 : { value2: value2 }
    `),
      `
const v = value => a ? value : { [value]: value }
const v2 = value2 => a ? value2 : { value2 }
    `,
    )
  })

  it('Remove unneeded key quote', async () => {
    equal(
      await processJSObject("const x = {a: 1, 'b': 2, 'c&c':5 }"),
      "const x = {'c&c':5, a: 1, b: 2 }",
    )
  })

  it('Process empty', async () => {
    equal(
      await processJSObject(`
const x =  {a:{}, '': {}}
      `),
      `
const x =  {'': {}, a:{}}
      `,
    )
  })

  it('Dynamic keys', async () => {
    equal(
      await processJSObject('const x = {[`${n+1}/bbb`]:1, [`${n+1}/aaa`]:2}'),
      'const x = {[`${n+1}/aaa`]:2, [`${n+1}/bbb`]:1}',
    )
  })

  it('Object methods', async () => {
    equal(
      await processJSObject(
        `
const x = { 
  z,
  d(){},
  set e (v) { },
  n:() => null, 
  get c() { return 1 },
  async a(){},   
  j() {},
}`,
      ),
      `
const x = { 
  set e (v) { },
  get c() { return 1 },
  n:() => null,
  z, 
  d(){},
  j() {},   
  async a(){},
}`,
    )
  })

  it('Object methods 2', async () => {
    equal(
      await processJSObject(`
const x = {
 a () {},
 b: () => {},
 c: null,
 d: () => {},
}`),
      `
const x = {
 b: () => {},
 c: null,
 d: () => {},
 a () {},
}`,
    )
  })
})

/* global describe, before, after, it */
