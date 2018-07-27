(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .config(routesConfig);

  function routesConfig($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/calendar/map',
        params: {
          eventRoutes: null
        },
        template: '<cal-map-route />'
      });
  }
})(angular);
