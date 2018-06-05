const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require('./server/routes')


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

//passport middleware
app.use(passport.initialize());

//passport config
require('./server/config/passport')(passport);

//Routes 
app.use('', routes);


module.exports = app;