(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .factory('calendarGeoApi', calendarGeoApi);

  function calendarGeoApi($window, $geolocation, calendarMapRestangular) {
    return {
      supported: supported,
      getCurrentPosition: getCurrentPosition,
      getAddressFromCoordonate: getAddressFromCoordonate,
      getCoordonateFromAddress: getCoordonateFromAddress,
      getRoutes: getRoutes
    };

    function supported() {
      return 'geolocation' in $window.navigator;
    }

    function getCurrentPosition() {
      return $geolocation.getCurrentPosition();
    }

    function getAddressFromCoordonate(latitude, longitude) {
      return calendarMapRestangular.one('/reverse').one(latitude).one(longitude).get();
    }

    function getCoordonateFromAddress(address) {
      return calendarMapRestangular.one('search').one(address).get();
    }

    function getRoutes(transportType, currentPositionLatitude, currentPositionLongitude, eventLatitude, eventLongitude) {
      return calendarMapRestangular.one('routes').one(transportType)
        .one(currentPositionLatitude).one(currentPositionLongitude)
        .one(eventLatitude).one(eventLongitude)
        .get().then(function(result) {
          return result.data;
        });
    }
  }
})(angular);
