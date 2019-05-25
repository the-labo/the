'use strict'
const { TheRTCClient } = require('../lib')

document.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:3000'

  const video01 = document.getElementById('video01')
  const video02 = document.getElementById('video02')
  const video03 = document.getElementById('video03')
  const video04 = document.getElementById('video04')
  const video01Title = document.getElementById('video01-title')
  const video02Title = document.getElementById('video02-title')
  const video03Title = document.getElementById('video03-title')
  const video04Title = document.getElementById('video04-title')

  const c1 = new TheRTCClient({
    info: { userName: 'This is client01' },
    mediaConstrains: { audio: false, video: true },
    onLocal: ({ info, stream }) => {
      video01Title.innerText = info.userName
      setVideoStream(video01, stream)
    },
    onRemote: ({ info, stream }) => {
      video02Title.innerText = info.userName
      setVideoStream(video02, stream)
    },
  })
  const c2 = new TheRTCClient({
    info: { userName: 'This is client02' },
    mediaConstrains: { audio: false, video: true },
    onLocal: ({ info, stream }) => {
      video03Title.innerText = info.userName
      setVideoStream(video03, stream)
    },
    onRemote: ({ info, stream }) => {
      video04Title.innerText = info.userName
      setVideoStream(video04, stream)
    },
  })

  await c1.connect(url)
  await c2.connect(url)

  const roomName = 'room01'

  const setVideoStream = (video, stream) => {
    if (!stream) {
      console.warn('No stream')
      return
    }
    const knownId = video.srcObject && video.srcObject.id
    if (knownId === stream.id) {
      return
    }
    video.srcObject = stream
  }

  await c1.join(roomName)
  await c2.join(roomName)

  {
    const unsubscribe = c2.subscribe('greeting', ({ from, payload }) => {
      console.log('c2 received greeting', from, payload)
      unsubscribe()
    })
  }

  {
    const unsubscribe = c1.subscribe('greeting', ({ from, payload }) => {
      console.log('c1 received greeting', from, payload)
      unsubscribe()
    })
  }

  setTimeout(() => {
    void c1.publish('greeting', { msg: 'hi, i am c1' })
    void c2.publish('greeting', { msg: 'hi, i am c2' })
  }, 500)
})
