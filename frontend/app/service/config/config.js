(function() {
    'use strict';

    var MODULE_NAME = 'linagora.esn.calendar.map';

    angular.module(MODULE_NAME)

      .factory('mapConfig', function(esnConfig) {
        return function(key, defaultValue) {
          return esnConfig(MODULE_NAME + '.' + key, defaultValue);
        };
      });

})();
