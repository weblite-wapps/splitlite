var models = require('../models')

const R = require('ramda')

// Helpers
const updateGraphWithPaymentUnit = payment => balances => {
  const index = R.findIndex((balance) => balance.source == payment.from && balance.target == payment.to, balances)
  if (index == -1) {
    balances.push( {source: payment.from, target: payment.to, value: payment.value} )
    balances.push( {source: payment.to, target: payment.from, value: -1 * payment.value} )
  } else {
    const index = R.findIndex((balance) => balance.source == payment.to && balance.target == payment.from, balances)  
    balances[index].value += payment.value
    balances[inverseIndex].value -= payment.value
  }
  return balances
}

function updateGraph(transObj) {
  return models.BalanceGraph.findOne({wisId: transObj.wisId})
    .then(graph => {
      const graphUpdater = R.pipe(...R.map(payment => updateGraphWithPaymentUnit(payment), transObj.payments))
      const resBalance = graphUpdater(graph.balances)

      return models.BalanceGraph.updateOne({wisId: transObj.wisId}, {balances: resBalance}).exec()
    })
    .catch(err => { throw err })
}

// Users
exports.fetchUsers = function (wisId) {
  return models.User.find({wisId: wisId})
}
exports.addUser = function(username, wisId) {
  return models.User.findOne({username: username, wisId: wisId}).then(user => {
    if (!user) {
      const userAdded = new models.User({ username: username, wisId: wisId })
      return userAdded.save()
    }
    throw new Error('user Exists Already!')
  })
}

// Graph
exports.fetchGraph = function(wisId) {
  return models.BalanceGraph.findOne({wisId: wisId})
    .then(graph => {
      if (!graph) {
        const graph = new models.BalanceGraph({ balances: [], wisId: wisId })
        return graph.save()
      }
      return graph
    })
    .catch(err => {throw err})
}

// Transaction
exports.fetchTransactions = function(wisId) {
  return models.Transaction.find({wisId: wisId})
}
exports.addTransaction = function(transObj) {
  const trans = new models.Transaction(transObj)
  return trans.save()
    .then(trans => { return updateGraph(trans) })
    .catch(err => { throw err })
}