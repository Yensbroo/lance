const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./server/routes');


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

// Routes
app.use("", routes);


const hostName = "localhost";
const port = process.env.PORT || 8000;
const nodeEnv = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
if (nodeEnv !== 'production') {
  console.log('You are on the development server');
}

app.listen(port, hostName, () => {
  console.log(`Server started at http://${hostName}:${port}/`);
})