'use strict';

var MODULE_NAME = 'linagora.esn.calendar.map';

angular.module(MODULE_NAME)
  .component('calTransportModeForm', {
    restrict: 'E',
    templateUrl: '/linagora.esn.calendar.map/app/components/calTransportMode/calTransportMode.html',
    controller: 'calTransportModeFormController',
    controllerAs: 'ctrl',
    bindings: {
      controls: '<',
      onChangeMode: '&'
    }
  });
