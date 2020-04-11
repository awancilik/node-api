const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

var http = require('http')
var server = http.createServer(app)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.post('/recepients', db.createRecepient)
app.get('/recepients', db.getRecepientId)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})