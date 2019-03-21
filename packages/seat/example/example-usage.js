'use strict'

const theSeat = require('the-seat')

async function tryExample () {

  const seat = theSeat()

  {
    const ports = seat.scope('ports')
    {
      const myapp01 = ports.bind('myapp01')
      console.log(myapp01.canTake(3000)) // -> true
      myapp01.take(3000)
      console.log(myapp01.canTake(3000)) // -> true
      console.log(myapp01.get()) // -> false
    }

    {
      const myapp02 = ports.bind('myapp02')

      console.log(myapp02.canTake(3000)) // -> false, because myapp01 already took it.
      myapp02.take(3001)
      /* ... */
    }

    {
      // Define utility method to take port
      const portFor = (name, portBase = 3000) => {
        const {get, take, has, canTake} = ports.bind(name)
        if (has()) {
          return get()
        }
        let taking = portBase
        while (!canTake(taking)) {
          taking += 1
        }
        take(taking)
        return get()
      }

      const portForApp3 = portFor('myapp03')
      /* ... */
    }
  }
}

tryExample().catch((err) => console.error(err))
