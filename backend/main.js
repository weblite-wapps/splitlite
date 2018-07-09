var dbHandler = require('./database/dbHandler')
var { router } = require('./routing/routes')

var express = require('express')
var app = express()

app.use('/', router)

dbHandler.connect2db('splitlite')
app.listen(3000, () => console.log('Server is listening ...'))