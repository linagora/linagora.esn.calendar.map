(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .factory('mapUtils', mapUtils);

  function mapUtils() {
    return {
      displayDistance: displayDistance,
      displayTime: displayTime
    };

    function displayDistance(distance) {
      return distance <= 1000 ? Math.round(distance) + ' m' : (distance * 0.001).toFixed(2) + ' Km';
    }

    function displayTime(duration) {
      return duration <= 60 ? Math.round(duration) + ' min' : _getTimeFromMins(duration);
    }

    function _getTimeFromMins(duration) {
      var t = (duration / 60).toFixed(2).split('.');

      return t[0] + ' h ' + Math.round(t[1] * 0.6) + ' min';
  }
  }
})(angular);
