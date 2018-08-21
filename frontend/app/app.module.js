(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME, [
    'restangular',
    'leaflet-directive',
    'ngAnimate',
    'esn.module-registry',
    'esn.configuration'
  ])
  .run(function(esnModuleRegistry, CALENDAR_MAP_MODULE_METADATA) {
    esnModuleRegistry.add(CALENDAR_MAP_MODULE_METADATA);
  })
;
})();
