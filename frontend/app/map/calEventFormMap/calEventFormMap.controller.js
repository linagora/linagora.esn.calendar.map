(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calEventFormMapController', calEventFormMapController);

  function calEventFormMapController(
    $scope,
    $q,
    calendarGeoApi,
    DEFAULT_TILES,
    DEFAULT_CENTER,
    DEFAULT_TRANSPORT_TYPE,
    $stateParams
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
    self.eventLocation = self.eventLocation || $stateParams.location || null;
    self.defaults = {scrollWheelZoom: false};

    $scope.$watch('ctrl.eventLocation', function(newVal) {
      if (!newVal) {
        self.addressIsValid = false;

        return;
      }

      if (newVal === self.oldLocation) {
        return;
      }

      self.oldLocation = newVal;

      calendarGeoApi.getCoordonateFromAddress(newVal).then(function(result) {
        if (!result.data) {
          self.addressIsValid = false;

          return;
        }

        self.eventCoord = result.data;

        return _updatePosition(result.data);
      });
    });

    function $onInit() {
      if (self.eventLocation) {
        self.oldLocation = self.eventLocation;

        calendarGeoApi.getCoordonateFromAddress(self.eventLocation).then(function(result) {
          if (!result.data) {
            self.addressIsValid = false;

            return;
          }

          self.eventCoord = result.data;

          _updatePosition(result.data);
        });
      }
    }

    function getRoutes() {
      calendarGeoApi.getCurrentPosition()
        .then(function(currentPositionAddress) {
          if (!currentPositionAddress) {
            self.routes = null;

            return;
          }

          var currentPositionLatitude = currentPositionAddress.coords.latitude.toString();
          var currentPositionLongitude = currentPositionAddress.coords.longitude.toString();

          calendarGeoApi.getRoutes(DEFAULT_TRANSPORT_TYPE, currentPositionLatitude, currentPositionLongitude, self.eventCoord.lat, self.eventCoord.lon)
            .then(function(routes) {
              self.routes = routes;
            }).catch(function() {
              self.routes = null;
            });
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

      getRoutes();

      self.originalCenter = angular.copy(self.center);
    }

    function updateCenter() {
      self.center = angular.copy(self.originalCenter);
    }
  }
})();
