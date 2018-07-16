'use strict';

module.exports = function(dependencies) {
  const i18n = require('./i18n')(dependencies);

  return {
    i18n
  };
};
