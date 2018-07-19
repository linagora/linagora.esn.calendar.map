(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calinfoBoxController', calinfoBoxController);

  function calinfoBoxController(
    $scope,
    $window,
    calendarGeoApi,
    calendarMapRestangular,
    DEFAULT_DURATION,
    DEFAULT_DISTANCE
  ) {
    var self = this;
    var L = $window.L;

    self.$onInit = $onInit;

    $scope.$watch('ctrl.destinationAddress', function(newVal) {
      if (!newVal) {
        return;
      }

      _updateInfoBox();
    });

    function $onInit() {
      _injectBox();
    }

    function _updateInfoBox() {
      self.duration = DEFAULT_DURATION;
      self.distance = DEFAULT_DISTANCE;

      calendarGeoApi.getCurrentPosition()
        .then(function(position) {
          return calendarGeoApi.getAddressFromCoordonate(position.coords.latitude.toString(), position.coords.longitude.toString());
        })
        .then(function(currentPositionAddress) {
          calendarMapRestangular.one('routes').one('car').one(currentPositionAddress.data).one(self.destinationAddress).get().then(function(result) {
            self.duration = _displayTime(result.data.routes[0].all_duration);
            self.distance = _displayDistance(result.data.routes[0].all_distance);
          });
        });
    }

    function _displayDistance(distance) {
      return distance <= 1000 ? Math.round(distance) + ' m' : (distance * 0.001).toFixed(2) + ' Km';
    }

    function _displayTime(duration) {
      return duration <= 60 ? Math.round(duration) + ' min' : getTimeFromMins(duration);
    }

    function _injectBox() {
      var infoBox = L.control({
        position: 'topright'
      });

      infoBox.onAdd = function() {
        this.div = L.DomUtil.get('infoBox');

        return this.div;
      };

      self.controls.custom.push(infoBox);
    }

    function getTimeFromMins(duration) {
        var t = (duration / 60).toFixed(2).split('.');

        return t[0] + ' h ' + Math.round(t[1] * 0.6) + ' min';
    }
  }
})();
