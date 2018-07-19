const { R } = window

export const extractUniqueLists = (users, currentProperty) => (sources, targets) => {
  const valuesRelatedToUserInList = (name, list) => R.filter(R.propEq('user', name), list)
  const SumOfDesiredPropInList = (name, prop, list) => R.sum(R.pluck(prop, valuesRelatedToUserInList(name, list)))

  const collapseUsersAccordingToProp = (users, prop) => list => R.map(user => ({ user, value: SumOfDesiredPropInList(user, prop, list) }), users)
  const emmitZeroes = list => R.filter(R.prop('value'), list)
  const makeListUniqueAccordingToProp = (list, prop, users) => R.compose(emmitZeroes, collapseUsersAccordingToProp(users, prop))(list)

  const uniqueSources = makeListUniqueAccordingToProp(sources, 'value', users)
  const uniqueTargets = makeListUniqueAccordingToProp(targets, currentProperty, users)

  return ({ sources: uniqueSources, targets: uniqueTargets })
}

export const simplifyTransLists = ({ sources, targets }) => {
  const updateValueWithIndex = (itemIndex, newValue) => {
    const valueLens = R.lensPath([itemIndex, 'value'])
    return R.set(valueLens, newValue)
  }

  const simplifyUserTrans = src => transPair => {
    const srcIndex = R.findIndex(({ user }) => user == src.user, transPair.sources)
    const tarIndex = R.findIndex(({ user }) => user == src.user, transPair.targets)

    if (srcIndex >= 0 && tarIndex >= 0) {
      if (transPair.sources[srcIndex].value >= transPair.targets[tarIndex].value) {
        const updatedTargets = updateValueWithIndex(tarIndex, 0)(transPair.targets)
        const updatedSources = updateValueWithIndex(srcIndex, transPair.sources[srcIndex].value - transPair.targets[tarIndex].value)(transPair.sources)

        return { sources: updatedSources, targets: updatedTargets }
      } else {
        const updatedSources = updateValueWithIndex(srcIndex, 0)(transPair.sources)
        const updatedTargets = updateValueWithIndex(tarIndex, transPair.targets[tarIndex].value - transPair.sources[srcIndex].value)(transPair.targets)

        return { sources: updatedSources, targets: updatedTargets }
      }
    }
    return transPair
  }

  if (!sources.length || !targets.length) return ({ sources: null, targets: null })


  const simplifier = R.pipe(...R.map(simplifyUserTrans, sources))
  const simplifiedPair = simplifier({ sources, targets })

  const finalSources = R.filter(R.prop('value'), simplifiedPair.sources)
  const finalTargets = R.filter(R.prop('value'), simplifiedPair.targets)

  return ({ sources: finalSources, targets: finalTargets })
}

export const extractPaymentsAndBuildTransObject = (title, wisId) => ({ sources, targets }) => {
  if (!sources || !targets)
    return null

  const sumOfFinalSources = R.sum(R.pluck('value', sources))

  const updatePaymentwithTarget = target => {
    const ownings = R.map(src => ({ from: target.user, to: src.user, value: src.value / sumOfFinalSources * target.value }), sources)
    return R.insertAll(0, ownings)
  }

  const payments = R.pipe(...R.map(updatePaymentwithTarget, targets))([])

  return ({ title, sources, payments, wisId })
}
