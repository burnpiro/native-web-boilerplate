const express = require('express')
const path = require('path')
const compression = require('compression')
const request = require('request')

const {PORT=3001, NODE_ENV} = process.env
const server = express()

server.use(compression())
server.use('/', express.static(path.join(__dirname, '../build/web'), {maxAge: '1 year'}))

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})