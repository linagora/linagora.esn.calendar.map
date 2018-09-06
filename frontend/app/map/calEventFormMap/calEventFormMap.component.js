(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .component('calEventFormMap', {
      restrict: 'E',
      templateUrl: '/linagora.esn.calendar.map/app/map/calEventFormMap/calEventFormMap.html',
      controller: 'calEventFormMapController',
      controllerAs: 'ctrl',
      bindings: {
        eventLocation: '<'
      }
    });
})(angular);
