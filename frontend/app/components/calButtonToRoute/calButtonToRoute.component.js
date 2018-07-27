'use strict';

var MODULE_NAME = 'linagora.esn.calendar.map';

angular.module(MODULE_NAME)
  .component('calButtonToRoute', {
    restrict: 'E',
    templateUrl: '/linagora.esn.calendar.map/app/components/calButtonToRoute/calButtonToRoute.html',
    controller: 'calBtnToRouteController',
    controllerAs: 'ctrl',
    bindings: {
      controls: '<',
      eventRoutes: '<'
    }
  });
