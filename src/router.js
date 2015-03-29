'use strict';

var config = require('./config/config');
var home = require('./controllers/home');
var users = require('./controllers/users');

module.exports = function(app) {
  // Path from browser
  app.use('/', home);
  app.use('/users', users);
};
