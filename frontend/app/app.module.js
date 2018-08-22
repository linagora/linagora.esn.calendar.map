(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME, [
    'op.dynamicDirective',
    'restangular',
    'leaflet-directive',
    'ngAnimate',
    'esn.module-registry',
    'esn.configuration'
  ]);
})();
