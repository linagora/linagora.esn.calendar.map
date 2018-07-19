'use strict';

var MODULE_NAME = 'linagora.esn.calendar.map';

angular.module(MODULE_NAME)
  .component('calInfoBox', {
    restrict: 'E',
    templateUrl: '/linagora.esn.calendar.map/app/map/infoBox/infoBox.html',
    controller: 'calinfoBoxController',
    controllerAs: 'ctrl',
    bindings: {
      destinationAddress: '<',
      controls: '<'
    }
  });
