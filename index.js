// index.js
// where your node app starts

// init project
require('dotenv').config()
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.set('Content-Type', 'application/json')
  res.json({greeting: 'helloworld'})
})

app.get("/api/:date?", function (req, res) {
	try {
		res.set('Content-Type', 'application/json')
		let dateParams = req.params.date
		let date = dateParams ? new Date(Number(dateParams) || dateParams) : new Date()
		if (date.toString() == 'Invalid Date') { throw 'Invalid Date' }
  	res.json({unix: date.getTime(), utc: date.toUTCString()})
	} catch(err) {
		res.status(400)
		res.json({error: 'Invalid Date'})
	}
})

module.exports = app
