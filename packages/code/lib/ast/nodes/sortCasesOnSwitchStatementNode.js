/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortCasesOnSwitchStatementNode
 */
'use strict'

const { compareStrings } = require('../../helpers/arrayHelper')

/** @lends module:@the-/code.ast.nodes.sortCasesOnSwitchStatementNode */
function sortCasesOnSwitchStatementNode(SwitchStatement, { swap }) {
  const Cases = [...SwitchStatement.cases]

  const CasesWithBlock = Cases.filter(
    (Case) => Case.consequent && Case.consequent.length > 0,
  ).sort((a, b) => a.start - b.start)
  const CasesWithoutBlock = Cases.filter((Case) => Case.consequent.length === 0)

  const SubCasesHash = {}
  for (const Case of CasesWithoutBlock) {
    const ParentCase = CasesWithBlock.find((C) => Case.end < C.start)
    SubCasesHash[ParentCase.start] = [
      ...(SubCasesHash[ParentCase.start] || []),
      Case,
    ]
  }
  const getFirstSubCase = (Case) => {
    const SubCases = (SubCasesHash[Case.start] || []).sort(
      (a, b) => a.start - b.start,
    )
    return SubCases[0]
  }

  const rangeFor = (Case) => {
    const firstCase = getFirstSubCase(Case) || Case
    const [leadingComment] = firstCase.leadingComments || []
    return [leadingComment ? leadingComment.start : firstCase.start, Case.end]
  }

  const sortedByStart = [...CasesWithBlock].sort((a, b) => a.start - b.start)
  const sortedByName = [...CasesWithBlock].sort((a, b) => {
    const aWeight = _weightCase(a)
    const bWeight = _weightCase(b)
    if (aWeight !== bWeight) {
      return aWeight - bWeight
    }

    return compareStrings(
      _nameOfCase(getFirstSubCase(a) || a),
      _nameOfCase(getFirstSubCase(b) || b),
    )
  })

  for (let i = 0; i < sortedByStart.length; i++) {
    const byStart = sortedByStart[i]
    const byName = sortedByName[i]
    if (byStart.start !== byName.start) {
      return swap(rangeFor(byStart), rangeFor(byName))
    }
  }
}

const _nameOfCase = ({ test }) => {
  if (!test) {
    return null
  }
  return String(
    test.name ||
      test.value ||
      test.raw ||
      (test.property && test.property.name) ||
      '',
  )
}
const _weightCase = (Case) => {
  let weight = 0
  if (Case.test) {
    switch (Case.test.type) {
      case 'StringLiteral':
        weight -= 100
        break
      default:
        weight += 100
        break
    }
  } else {
    weight += 10000
  }
  return weight
}

module.exports = sortCasesOnSwitchStatementNode
