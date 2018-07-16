'use strict';

module.exports = function(dependencies, application) {
  const i18nLib = require('../../lib/i18n')(dependencies);

  application.use(i18nLib.init);
};
