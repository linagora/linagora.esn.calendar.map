(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .component('calRouteInfo', {
      restrict: 'E',
      templateUrl: '/linagora.esn.calendar.map/app/components/calRouteInfo/calRouteInfo.html',
      controllerAs: 'ctrl',
      bindings: {
        controls: '<',
        instructionsList: '<',
        duration: '<',
        distance: '<'
      }
    });
})(angular);
