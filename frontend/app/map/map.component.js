'use strict';

var MODULE_NAME = 'linagora.esn.calendar.map';

angular.module(MODULE_NAME)
  .component('calMap', {
    restrict: 'E',
    templateUrl: '/linagora.esn.calendar.map/app/map/map.html',
    controller: 'calMapController',
    controllerAs: 'ctrl',
    bindings: {
      eventLocation: '<',
      currentPosition: '=?',
      destinationAddress: '=?',
      routingData: '=?'
    }
  });
