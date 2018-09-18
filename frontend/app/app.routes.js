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
      })
      .state('map.directions', {
        url: '/directions',
        views: {
          'sidebar@map': {
            templateUrl: '/linagora.esn.calendar.map/app/components/calRouteInfo/calRouteInfo.html'
          }
        }
      });
  }
})(angular);
