'use strict';

module.exports = function(dependencies) {
  const i18n = require('./i18n')(dependencies);
  const routes = require('./routes')(dependencies);

  return {
    i18n,
    routes
  };
};
