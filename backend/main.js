// modules
var express = require('express')
const path = require('path')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
// files
var dbHandler = require('./database/dbHandler')
var { router } = require('./routing/routes')


const app = express()
app.use(cors({ origin: '*' }))
app.use('/', router)
dbHandler.connect2db('splitlite')


const key = fs.readFileSync(path.resolve('./certs/express.key'), 'utf8')
const cert = fs.readFileSync(path.resolve('./certs/express.crt'), 'utf8')


https
  .createServer({ key, cert }, app)
  .listen(3092)
