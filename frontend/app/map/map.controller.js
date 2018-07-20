(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calMapController', mapController);

  function mapController(
    $scope,
    $window,
    $q,
    calendarGeoApi,
    leafletBoundsHelpers,
    DEFAULT_TILES,
    DEFAULT_CENTER
  ) {
    var self = this;

    self.$onInit = $onInit;
    self.updateControls = updateControls;
    self.updateCenter = updateCenter;

    self.tiles = DEFAULT_TILES;
    self.center = self.center || DEFAULT_CENTER;
    self.addressIsValid = false;
    self.supported = calendarGeoApi.supported();
    self.controls = {
      custom: []
    };

    $scope.$watch('ctrl.eventLocation', function(newVal) {
      if (!newVal) {
        self.addressIsValid = false;

        return;
      }

      calendarGeoApi.getCoordonateFromAddress(newVal).then(function(result) {
        if (!result.data) {
          self.addressIsValid = false;

          return;
        }

        return _updatePosition(result.data);
      });
    });

    function $onInit() {
      var promises = [calendarGeoApi.getCurrentPosition()];

      if (self.eventLocation) {
        promises.push(calendarGeoApi.getCoordonateFromAddress(self.eventLocation));
      }

      $q.all(promises).then(function(result) {
        self.currentPosition = result[0];

        if (result[1] && result[1].data) {
          _updatePosition(result[1].data);
        }
      });
    }

    function updateControls(control) {
      self.controls.custom.push(control);
    }

    function _updatePosition(coordonate) {
      self.addressIsValid = true;

      self.markers = {
        eventLocation: {
          lat: parseFloat(coordonate.lat),
          lng: parseFloat(coordonate.lon)
        }
      };

      self.center = {
          lat: parseFloat(coordonate.lat),
          lng: parseFloat(coordonate.lon),
          zoom: 15
      };

      self.originalCenter = angular.copy(self.center);
    }

    function updateCenter() {
      self.center = angular.copy(self.originalCenter);
    }
  }
})();
