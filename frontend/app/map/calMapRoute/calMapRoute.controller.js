(function(angular) {
    'use strict';

    angular.module('linagora.esn.calendar.map')
      .controller('calMapRouteController', calMapRouteController);

    function calMapRouteController(
      $stateParams,
      calendarGeoApi,
      calendarMapRestangular,
      leafletBoundsHelpers,
      mapUtils,
      DEFAULT_TILES
    ) {
      var self = this;

      self.$onInit = $onInit;
      self.changeTransportMode = changeTransportMode;

      self.tiles = DEFAULT_TILES;
      self.center = {};
      self.addressIsValid = false;
      self.supported = calendarGeoApi.supported();
      self.controls = {
        custom: []
      };

      var eventRoutes = $stateParams.eventRoutes;

      function $onInit() {
        _updateRoutes(eventRoutes);
        _updateRouteInfo(eventRoutes);
      }

      function changeTransportMode(transportMode) {
        calendarMapRestangular.one('routes')
          .one(transportMode)
          .one(self.start.lat.toString()).one(self.start.lng.toString())
          .one(self.destination.lat.toString()).one(self.destination.lng.toString())
          .get().then(function(result) {
            _updateRoutes(result.data);
            _updateRouteInfo(result.data);
          });
      }

      function _updateRoutes(route) {
        var routeCoords = route.routes[0].linestring.coordinates;
        var t = routeCoords.length - 1;
        var waypoints = _getWaypoints(route);

        self.start = {
          lat: waypoints[0][0],
          lng: waypoints[0][1]
        };

        self.destination = {
          lat: waypoints[1][0],
          lng: waypoints[1][1]
        };

        var firstPoint = {
          lat: routeCoords[0][1],
          lng: routeCoords[0][0]
        };

        var lastPoint = {
          lat: routeCoords[t][1],
          lng: routeCoords[t][0]
        };

        var routeLinestring = [{
          type: 'Feature',
          properties: {type: 'route'},
          geometry: {
            type: 'LineString',
            coordinates: routeCoords
          }
        }, {
          type: 'Feature',
          properties: {type: 'link'},
          geometry: {
            type: 'LineString',
            coordinates: [[firstPoint.lng, firstPoint.lat], [self.start.lng, self.start.lat]]
          }
        }, {
          type: 'Feature',
          properties: {type: 'link'},
          geometry: {
            type: 'LineString',
            coordinates: [[lastPoint.lng, lastPoint.lat], [self.destination.lng, self.destination.lat]]
          }
        }];

        self.geojson = {
          data: routeLinestring,
          style: function(ls) {
            switch (ls.properties.type) {
              case 'route': return {color: '#16567D', weight: 5, opacity: 1};
              case 'link' : return {color: '#16567D', weight: 5, opacity: 1, dashArray: '10'};
            }
          }
        };

        self.markers = {start: self.start, destination: self.destination};
        self.bounds = leafletBoundsHelpers.createBoundsFromArray(waypoints);
      }

      function _updateRouteInfo(route) {
          var instructions = _getInstructions(route);
          var distances = _getDistances(route);
          var icons = _getIcons(route);

          self.duration = mapUtils.displayTime(route.routes[0].all_duration);
          self.distance = mapUtils.displayDistance(route.routes[0].all_distance);
          self.instructionsList = [];

          for (var i = 0; i <= instructions.length; i++) {
            self.instructionsList.push({
              instruction: instructions[i],
              distance: distances[i],
              icon: icons[i]
            });
          }
      }

      function _getWaypoints(route) {
        var res = route.waypoints;
        var waypoints = [
            [parseFloat(res[0].lat), parseFloat(res[0].long)],
            [parseFloat(res[1].lat), parseFloat(res[1].long)]
        ];

        return waypoints;
      }

      function _getInstructions(route) {
        var steps = route.routes[0].steps;
        var instructions = [];

        for (var i = 0; i < steps.length; i++) {
            instructions.push(steps[i].description);
        }

        return instructions;
      }

      function _getDistances(route) {
        var steps = route.routes[0].steps;
        var distances = [];

        for (var i = 0; i < steps.length; i++) {
          // or add it in the end
          if (steps[i].distance === 0) {
              distances.push('');
          } else if (steps[i].distance > 1000) {
              distances.push((steps[i].distance * 0.001).toFixed(2) + ' km');
          } else {
              distances.push(steps[i].distance + ' m');
          }
        }

        return distances;
      }

      function _getIcons(route) {
        var steps = route.routes[0].steps;
        var icons = [];

        for (var i = 0; i < steps.length; i++) {
            var icon = _iconClass(steps[i].icon);

            icons.push(icon);
        }

        return icons;
      }

      function _iconClass(iconInitial) {
        var iconClass;

        switch (iconInitial) {
          case 'Dep':
            iconClass = 'mdi mdi-map-marker depIcon';
            break;
          case 'Arr':
            iconClass = 'mdi mdi-map-marker arrIcon';
            break;
          case 'Rd':
            iconClass = 'mdi mdi-reload mdi-flip-h';
            break;
          case 'C':
          case 'S':
            iconClass = 'mdi mdi-arrow-up';
            break;
          case 'R':
          case 'SlR':
          case 'ShR':
            iconClass = 'mdi mdi-subdirectory-arrow-right mdi-flip-v';
            break;
          case 'L':
          case 'SlL':
          case 'ShL':
            iconClass = 'mdi mdi-subdirectory-arrow-left mdi-flip-v';
            break;
          case 'Ut':
            iconClass = 'mdi mdi-undo-variant mdi-rotate-270';
            break;
          case 'MR':
            iconClass = 'mdi mdi-call-merge';
            break;
          case 'ML':
            iconClass = 'mdi mdi-call-merge mdi-flip-h';
            break;
          case 'FL':
            iconClass = 'mdi mdi-directions-fork';
            break;
          case 'FR':
            iconClass = 'mdi mdi-directions-fork mdi-flip-h';
            break;
        }

        return iconClass;
      }
    }
  })(angular);
