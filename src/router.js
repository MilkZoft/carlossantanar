'use strict';

var config = require('./lib/config');
var availableLanguages = config().languages.list.join('|');
var defaultController;
var homeController;
var contactController;

module.exports = function(app) {
  defaultController = require('./controllers/' + config().controllers.default);
  homeController = require('./controllers/home');
  contactController = require('./controllers/contact');

  // Load necessary helpers
  var i18n = require('./lib/helpers/i18n');
  var utils = require('./lib/helpers/utils');

  // Loading isMobile, basePath, currentLanguage and __
  app.use(function(req, res, next) {
    res.locals.isMobile = utils.isMobile(req.headers['user-agent']);
    res.locals.basePath = config().baseUrl + '/' + i18n.getCurrentLanguage(req.url);
    res.locals.currentLanguage = i18n.getCurrentLanguage(req.url);
    res.locals.__ = i18n.load(i18n.getCurrentLanguage(req.url));
    next();
  });

  // default css and js
  app.use(function(req, res, next) {
    if (utils.isMobile(req.headers['user-agent'])) {
      res.locals.css = [
        '/css/mobile/style.css'
      ];
    } else {
      res.locals.css = [
        '/bower_components/font-awesome/css/font-awesome.min.css',
        '/css/desktop/style.css'
      ];
    }

    res.locals.bottomJs = [
      '/bower_components/angular/angular.js',
      '/bower_components/lodash/dist/lodash.min.js',
      '/bower_components/restangular/dist/restangular.js'
    ];

    next();
  });

  // Controllers dispatch
  app.use('/', defaultController);
  app.use('/:language(' + availableLanguages + ')', defaultController);
  app.use('/:language(' + availableLanguages + ')/home', homeController);
  app.use('/:language(' + availableLanguages + ')/contact', contactController);
};
