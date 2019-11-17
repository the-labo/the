'use strict'

function ListenerPipe(parser) {
  return {
    pipeAll(mappings) {
      return Object.fromEntries(
        Object.entries(mappings)
          .filter(([, handle]) => !!handle)
          .map(([event, handle]) => [
            event,
            (e) => {
              const parsed = parser(e)
              handle(parsed)
            },
          ]),
      )
    },
  }
}

export default ListenerPipe
