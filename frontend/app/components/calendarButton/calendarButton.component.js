(function(angular) {

  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .component('calendarButton', {
      restrict: 'E',
      templateUrl: '/linagora.esn.calendar.map/app/components/calendarButton/calendarButton.html',
      controller: 'calendarButtonController',
      controllerAs: 'ctrl',
      bindings: {
        controls: '<'
      }
    });
})(angular);
