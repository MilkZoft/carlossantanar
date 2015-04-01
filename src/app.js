'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// config
var config = require('./lib/config');

// logging
var logger = require('morgan');
app.use(logger('dev'));

// cookies/session
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// layout
var less = require('less-middleware');
var exphbs = require('express-handlebars');
var hbsHelpers = require('./lib/helpers/handlebars');

// Handlebars setup
app.engine(config().html.extension, exphbs({
  extname: config().html.extension,
  defaultLayout: config().html.layout,
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  helpers: hbsHelpers
}));

// compile less for styles on the fly
if (!config().lessPrecompile) {
    app.use(less('/less', {
        pathRoot: __dirname,
        dest: '/public',
        preprocess: {
            path: function(path) {
                return path.replace('/css/', '/');
            }
        }
    }));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config().html.extension);
app.use(express.static(path.join(__dirname, 'public')));

// Sending config to templates
app.use(function(req, res, next) {
    res.locals.config = config();
    next();
});

// Disabling x-powered-by
app.disable('x-powered-by');

// dispatch router
require('./router')(app);

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
