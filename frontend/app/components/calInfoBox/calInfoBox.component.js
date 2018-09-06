(function(angular) {

  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .component('calInfoBox', {
      restrict: 'E',
      templateUrl: '/linagora.esn.calendar.map/app/components/calInfoBox/calInfoBox.html',
      controller: 'calinfoBoxController',
      controllerAs: 'ctrl',
      bindings: {
        routes: '<',
        controls: '<'
      }
    });
})(angular);
