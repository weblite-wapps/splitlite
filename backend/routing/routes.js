var bodyParser = require('body-parser')
var express = require('express')

var dbHelper = require('../database/helpers/functions')

var router = express.Router()

router.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
router.use(bodyParser.json())

// Users
router.get('/users/fetch', function (req, res) {
  const wisId = req.query['wisId']

  dbHelper.fetchUsers(wisId)
    .then(users => res.send(users))
    .catch(err => res.send(err))
})
router.post('/users/add', function(req, res) {
  const username = req.body['username']
  const wisId = req.body['wisId']

  dbHelper.addUser(username, wisId)
    .then((user) => res.status(200).end())
    .catch(err => res.status(500).end())
})

// Graph
router.get('/graph/fetch', function(req, res) {
  const wisId = req.query['wisId']

  dbHelper.fetchGraph(wisId)
    .then(graph => res.status(200).send(graph))
    .catch(err => res.status(500).send(err))
})

// Transactions
router.get('/transaction/fetch', function(req, res) {
  const wisId = req.query['wisId']

  dbHelper.fetchTransactions(wisId)
    .then(transes => res.status(200).send(transes))
    .catch(err => res.status(500).send(err))
})
router.post('/transaction/add', function(req, res) {
  const transObj = req.body

  dbHelper.addTransaction(transObj)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).send(err))
})

exports.router = router