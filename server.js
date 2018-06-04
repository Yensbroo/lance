const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');



const app = express();

//express middleware
var corsOption = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}

app.use(cors(corsOption));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Lance'
}))

module.exports = app;