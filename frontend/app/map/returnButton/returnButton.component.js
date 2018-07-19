'use strict';

var MODULE_NAME = 'linagora.esn.calendar.map';

angular.module(MODULE_NAME)
  .component('calReturnBtn', {
    restrict: 'E',
    templateUrl: '/linagora.esn.calendar.map/app/map/returnButton/returnButton.html',
    controller: 'calReturnButtonController',
    controllerAs: 'ctrl',
    bindings: {
      controls: '<',
      backToMarker: '&'
    }
  });
