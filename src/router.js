'use strict';

var config = require('./config/config');
var routes = require('./controllers/index');
var users = require('./controllers/users');

module.exports = function(app) {
  app.use('/', routes); // ruta barra nav, archivo controlador
  app.use('/users', users);
};
