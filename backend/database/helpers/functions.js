var models = require('../models')

const R = require('ramda')

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

function updateGraph(transObj) {
  return models.BalanceGraph.findOne({wisId: transObj.wisId})
    .then(graph => {
      const payments = transObj.payments
      var balances = graph.balances

      for (let i = 0; i < payments.length; i++) {
        console.log(i + ' : start')        
        console.log('payment\n' + payments[i])
        console.log('balances\n' + balances)
        
        // const index = R.findIndex(R.propEq('source', payments[i].from) && R.propEq('target', payments[i].to), balances)
        let index = -1
        for (let j = 0; j < balances.length; j++) {
          if (balances[j].source == payments[i].from && balances[j].target == payments[i].to) {
            index = j
            break
          }
        }

        console.log('index : ' + index)
        
        if (index == -1) {
          console.log('alive 1')
          
          balances.push( {source: payments[i].from, target: payments[i].to, value: payments[i].value} )
          balances.push( {source: payments[i].to, target: payments[i].from, value: -1 * payments[i].value} )
        } else {
          console.log('alive 2')
          // const inverseIndex = R.findIndex(R.and(R.propEq('source', payments[i].to),
          // R.propEq('target', payments[i].from)), balances)
          let inverseIndex = -1
          for (let j = 0; j < balances.length; j++) {
            if (balances[j].source == payments[i].to && balances[j].target == payments[i].from) {
              inverseIndex = j
              break
            }
          }
          
          console.log(balances[index])
          balances[index].value += payments[i].value
          console.log()
          balances[inverseIndex].value -= payments[i].value
        }

        console.log(i + ' : end')
      }

      return models.BalanceGraph.updateOne({wisId: transObj.wisId}, {balances: balances}).exec()
    })
    .catch(err => console.log('err in updateGraph: ' + err))
}

// Transaction
exports.fetchTransactions = function(wisId) {
  return models.Transaction.find({wisId: wisId})
}
exports.addTransaction = function(transObj) {
  const trans = new models.Transaction(transObj)
  return trans.save()
    .then(trans => {
        console.log('Alive 0')
        return updateGraph(trans) 
      })
    .catch(err => {
      console.log('err in addTrans() : ' + err)
      throw err
    })
}