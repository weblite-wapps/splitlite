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
  // const updateValueWithIndex = list => (itemIndex, newValue) => {
  //   const valueLens = R.lensPath(itemIndex, 'value')
  //   const updatedObject = R.over(valueLens, () => newValue, list)
  //   return updatedObject
  // }

  const updateValueWithIndex = list => (itemIndex, newValue) => {
    return R.map((item, index) => {
      if (index == itemIndex)
        return R.merge(item, { value: newValue })
      return item
    }, list)
  }

  const simplifyUserTrans = src => transPair => {
    console.log('simplify_0')
    const srcIndex = R.findIndex(({ user }) => user == src.user, transPair.sources)
    const tarIndex = R.findIndex(({ user }) => user == src.user, transPair.targets)
    console.log(srcIndex, tarIndex)

    if (srcIndex >= 0 && tarIndex >= 0) {
      console.log('simplify_1')
      if (transPair.sources[srcIndex].value >= transPair.targets[tarIndex].value) {
        const updatedTargets = updateValueWithIndex(transPair.targets)(tarIndex, 0)
        const updatedSources = updateValueWithIndex(transPair.sources)(srcIndex, transPair.sources[srcIndex].value - transPair.targets[tarIndex].value)
        
        return { sources: updatedSources, targets: updatedTargets }
      } else {
        const updatedSources = updateValueWithIndex(transPair.sources)(srcIndex, 0)
        const updatedTargets = updateValueWithIndex(transPair.targets)(tarIndex, transPair.targets[tarIndex].value - transPair.sources[srcIndex].value)
        
        return { sources: updatedSources, targets: updatedTargets }
      }
    }
    return transPair
  }

  if (!sources.length || !targets.length)
    return ({ sources: null, targets: null})

  console.log(sources)
  console.log(targets)

  const simplifier = R.pipe(...R.map(simplifyUserTrans, sources))
  const simplifiedPair = simplifier({ sources: sources, targets: targets })

  const finalSources = R.filter(R.prop('value'), simplifiedPair.sources)
  const finalTargets = R.filter(R.prop('value'), simplifiedPair.targets)


  return ({ sources: finalSources, targets: finalTargets})
}

export const extractPaymentsAndBuildTransObject = (title, wisId) => ({ sources, targets }) => {
  if (!sources || !targets)
    return null

  const sumOfFinalSources = R.sum(R.pluck('value', sources))

  const updatePaymentwithTarget = target => payments => {
    const ownings = R.map(src => ({from: target.user, to: src.user, value: src.value / sumOfFinalSources * target.value}), sources)
    return R.insertAll(0, ownings, payments)
  }

  const payments = R.pipe(...R.map(updatePaymentwithTarget, targets))([])

  return ({
    title: title,
    sources: sources,
    payments,
    wisId: wisId
  })
}