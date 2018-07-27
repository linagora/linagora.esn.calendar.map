'use strict';

var MODULE_NAME = 'linagora.esn.calendar.map';

angular.module(MODULE_NAME)
  .component('calMapRoute', {
    restrict: 'E',
    templateUrl: '/linagora.esn.calendar.map/app/map/calMapRoute/calMapRoute.html',
    controller: 'calMapRouteController',
    controllerAs: 'ctrl'
  });
