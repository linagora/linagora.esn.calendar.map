(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calinfoBoxController', calinfoBoxController);

  function calinfoBoxController(
    $scope,
    $window,
    calendarGeoApi,
    calendarMapRestangular,
    mapUtils,
    DEFAULT_DURATION,
    DEFAULT_DISTANCE,
    DEFAULT_TRANSPORT_TYPE
  ) {
    var self = this;
    var L = $window.L;

    self.$onInit = $onInit;

    $scope.$watch('ctrl.eventCoord', function(newVal) {
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
        .then(function(currentPositionAddress) {

          calendarMapRestangular.one('routes')
          .one(DEFAULT_TRANSPORT_TYPE)
          .one(currentPositionAddress.coords.latitude.toString()).one(currentPositionAddress.coords.longitude.toString())
          .one(self.eventCoord.lat).one(self.eventCoord.lon)
          .get().then(function(result) {
            self.duration = mapUtils.displayTime(result.data.routes[0].all_duration);
            self.distance = mapUtils.displayDistance(result.data.routes[0].all_distance);
            self.updateRoutes()(result.data);
          });
        });
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
  }
})();
