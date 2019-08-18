#!/usr/bin/env node
'use strict'

process.chdir(`${__dirname}/../..`)

const commentParser = require('comment-parser')
const { parse } = require('@the-/ast')
const { TheRefactor } = require('@the-/refactor')

async function main() {
  await new TheRefactor().convert(
    'packages/*/+(lib|misc)/**/+(*.js|*.jsx)',
    (content) => {
      const parsed = parse(content)
      const commentsData = parsed.comments
        .map((c) => ({
          ...(commentParser(content.substring(c.start, c.end)) || [])[0],
          node: c,
        }))
        .filter(Boolean)
      const lendsCommentData = commentsData.find((c) => {
        if (!c.tags) {
          return false
        }

        return c.tags.some((t) => t.tag === 'lends')
      })
      if (lendsCommentData) {
        const {
          tags: [{ name }],
        } = lendsCommentData
        const nameValues = name.split('.')
        const shortName = nameValues.pop()
        const nameSpace = nameValues.join('.')
        const pointedCommentData = commentsData
          .filter((c) => {
            return c.node.loc.start.column === 0
          })
          .find(
            (c) =>
              c.tags &&
              c.tags.some(
                (t) => t.tag === 'memberof' && t.name === nameSpace,
              ) &&
              c.tags.some(
                (t) =>
                  ['function', 'namespace', 'class'].includes(t.tag) &&
                  t.name === shortName,
              ),
          )
        if (pointedCommentData) {
          const { node: pointed } = pointedCommentData
          const { node: lends } = lendsCommentData
          const replaced = [
            content.substring(0, pointed.start),
            content.substring(pointed.end, lends.start),
            content.substring(pointed.start, pointed.end),
            content.substring(lends.end),
          ].join('')
          return replaced
        }
      }
    },
  )
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
