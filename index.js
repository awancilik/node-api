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
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.post('/recepients', db.createRecepient)
app.get('/recepients', db.getRecepientId)

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// server.listen(8080, '172.31.246.66');
// console.log('Server running at http://172.31.246.66:8080/');

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(8080, '172.31.246.66');