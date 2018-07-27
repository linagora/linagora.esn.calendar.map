(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calBtnToRouteController', calBtnToRouteController);

  function calBtnToRouteController(
    $window,
    $state
  ) {
    var L = $window.L;
    var self = this;

    self.$onInit = $onInit;
    self.goToMap = goToMap;

    function $onInit() {
      _injectButton();
    }

    function _injectButton() {
      var btnToRoute = L.control({
        position: 'bottomleft'
      });

      btnToRoute.onAdd = function() {
        this.div = L.DomUtil.get('btnToRoute');

        return this.div;
      };

      self.controls.custom.push(btnToRoute);
    }

    function goToMap() {
      $state.go('map', {
        eventRoutes: self.eventRoutes
      });
    }
  }
})();
