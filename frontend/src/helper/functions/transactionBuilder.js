const { R } = window

const valuesRelatedToUserInList = (name, list) => R.filter(R.propEq('user', name), list)
const SumOfDesiredPropInList = (name, prop, list) => R.sum(R.pluck(prop, valuesRelatedToUserInList(name, list)))

const collapseUsersAccordingToProp = (users, prop) => list => R.map(user => ({ user, value: SumOfDesiredPropInList(user, prop, list) }), users)
const emmitZeroes = R.filter(R.prop('value'))
const makeListUniqueAccordingToProp = (list, prop, users) => R.compose(emmitZeroes, collapseUsersAccordingToProp(users, prop))(list)

export const extractUniqueLists = (users, currentProperty) => (sources, targets) => {
  const uniqueSources = makeListUniqueAccordingToProp(sources, 'value', users)
  const uniqueTargets = makeListUniqueAccordingToProp(targets, currentProperty, users)

  return ({ sources: uniqueSources, targets: uniqueTargets })
}

const updateValueWithIndex = (itemIndex, newValue) => {
  const valueLens = R.lensPath([itemIndex, 'value'])
  return R.set(valueLens, newValue)
}

const simplifyUserTrans = src => transPair => {
  const { sources, targets } = transPair
  const srcIndex = R.findIndex(({ user }) => user == src.user, sources)
  const tarIndex = R.findIndex(({ user }) => user == src.user, targets)

  // Todo: Refactor
  if (srcIndex < 0 || tarIndex < 0)
    return transPair

  const targetValue = targets[tarIndex].value
  const sourceValue = sources[srcIndex].value
  const valuesDiff = sourceValue - targetValue


  if (valuesDiff >= 0) {
    const updatedSources = updateValueWithIndex(srcIndex, valuesDiff)(sources)
    const updatedTargets = updateValueWithIndex(tarIndex, 0)(targets)

    return { sources: updatedSources, targets: updatedTargets }
  } else {
    const updatedSources = updateValueWithIndex(srcIndex, 0)(sources)
    const updatedTargets = updateValueWithIndex(tarIndex, -valuesDiff)(targets)

    return { sources: updatedSources, targets: updatedTargets }
  }
}

export const simplifyTransLists = ({ sources, targets }) => {
  if (!sources.length || !targets.length) return ({ sources: null, targets: null })


  // Todo: Reduce refactor
  const simplifier = R.pipe(...R.map(simplifyUserTrans, sources))
  const simplifiedPair = simplifier({ sources, targets })

  const finalSources = R.filter(R.prop('value'), simplifiedPair.sources)
  const finalTargets = R.filter(R.prop('value'), simplifiedPair.targets)


  return ({ sources: finalSources, targets: finalTargets })
}


export const extractPaymentsAndBuildTransObject = (title, wisId) => ({ sources, targets }) => {
  if ((!sources || !targets) || (!sources.length || !targets.length)) return null

  const sumOfFinalSources = R.sum(R.pluck('value', sources))

  const updatePaymentwithTarget = target => {
    const ownings = R.map(src => ({ from: target.user, to: src.user, value: src.value / sumOfFinalSources * target.value }), sources)
    return R.insertAll(0, ownings)
  }

  // Todo: Reduce refactor
  const payments = R.pipe(...R.map(updatePaymentwithTarget, targets))([])

  return ({ title, sources, payments, wisId })
}
