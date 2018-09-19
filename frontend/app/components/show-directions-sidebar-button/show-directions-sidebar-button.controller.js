(function(angular) {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calShowDirectionsSidebarButtonController', calShowDirectionsSidebarButtonController);

  function calShowDirectionsSidebarButtonController($state) {
    var self = this;

    self.directionsDisplay = directionsDisplay;

    function directionsDisplay() {
      if ($state.includes('map.directions')) {
        $state.go('map');
        self.directions = false;
      } else {
        $state.go('map.directions');
        self.directions = !self.directions;
      }
    }
  }
})(angular);
